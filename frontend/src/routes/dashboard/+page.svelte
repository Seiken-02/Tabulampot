<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Calendar from '$lib/components/ui/Calender.svelte';
	import { getDashboardSummary, type DashboardSummary } from '$lib/api/dashboard';
	import { getPlants, getPlantHistory } from '$lib/api/plants';
	import { getProfile } from '$lib/api/auth';
	import type { Plant, ActivityLog } from '$lib/types';

	// summary: 3 angka ringkasan dari /api/dashboard (dihitung di backend)
	let summary = $state<DashboardSummary | null>(null);

	// historyByPlant: riwayat per tanaman, dipakai untuk kalender & log aktivitas.
	// Backend /api/dashboard belum menyediakan ini secara gabungan, jadi bagian ini
	// tetap diambil per tanaman seperti sebelumnya.
	let plants = $state<Plant[]>([]);
	let historyByPlant = $state<Record<number, ActivityLog[]>>({});

	let cuaca = $state<{ suhu: number; kondisi: string; icon: string } | null>(null);
	let userLabel = $state('');

	let isLoading = $state(true);
	let errorMessage = $state('');

	const today = new Date();
	const hariIni = today.toLocaleDateString('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	});
	const namaBulan = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

	const year = today.getFullYear();
	const month = today.getMonth();
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const calendarDays = $derived.by(() => {
		const days: (number | null)[] = [];
		for (let i = 0; i < firstDay; i++) days.push(null);
		for (let d = 1; d <= daysInMonth; d++) days.push(d);
		return days;
	});

	$effect(() => {
		loadDashboard();
		loadWeather();
	});

	async function loadDashboard() {
		isLoading = true;
		errorMessage = '';

		try {
			const [summaryResult, plantsResult, profile] = await Promise.all([
				getDashboardSummary(),
				getPlants(),
				getProfile().catch(() => null)
			]);
			summary = summaryResult;
			plants = plantsResult;
			userLabel = profile?.user.email.split('@')[0] ?? '';

			const histories = await Promise.all(plants.map((p) => getPlantHistory(String(p.id))));
			const map: Record<number, ActivityLog[]> = {};
			plants.forEach((p, i) => (map[p.id] = histories[i]));
			historyByPlant = map;
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Gagal memuat dashboard.';
		} finally {
			isLoading = false;
		}
	}

	// Cuaca real-time via Open-Meteo (gratis, tanpa API key perlu di-setup)
	// Lokasi: Pamekasan, Madura
	async function loadWeather() {
		try {
			const res = await fetch(
				'https://api.open-meteo.com/v1/forecast?latitude=-7.1667&longitude=113.4833&current=temperature_2m,weather_code'
			);
			const data = await res.json();
			const code: number = data.current.weather_code;
			cuaca = {
				suhu: Math.round(data.current.temperature_2m),
				kondisi: kondisiFromCode(code),
				icon: iconFromCode(code)
			};
		} catch {
			cuaca = null;
		}
	}

	function kondisiFromCode(code: number): string {
		if (code === 0) return 'Cerah';
		if ([1, 2, 3].includes(code)) return 'Cerah Berawan';
		if ([45, 48].includes(code)) return 'Berkabut';
		if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Hujan';
		if ([95, 96, 99].includes(code)) return 'Badai Petir';
		return 'Berawan';
	}

	function iconFromCode(code: number): string {
		if (code === 0) return '☀️';
		if ([1, 2, 3].includes(code)) return '⛅';
		if ([45, 48].includes(code)) return '🌫️';
		if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
		if ([95, 96, 99].includes(code)) return '⛈️';
		return '☁️';
	}

	// Log aktivitas terbaru: gabungan semua riwayat siram/pupuk dari semua tanaman,
	// urutkan dari yang paling baru terjadi
	const aktivitasTerbaru = $derived.by(() => {
		const items: {
			id: string;
			name: string;
			type: 'siram' | 'pupuk';
			waktu: string;
			timestamp: number;
		}[] = [];

		for (const p of plants) {
			const logs = historyByPlant[p.id] ?? [];
			for (const log of logs) {
				items.push({
					id: `${log.id}`,
					name: p.nickname,
					type: log.activityType === 'watering' ? 'siram' : 'pupuk',
					waktu: formatWaktuRelatif(log.activityDate),
					timestamp: new Date(log.activityDate).getTime()
				});
			}
		}

		return items.sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);
	});

	function formatWaktuRelatif(iso: string): string {
		const diffMs = Date.now() - new Date(iso).getTime();
		const diffMin = Math.floor(diffMs / (1000 * 60));
		const diffJam = Math.floor(diffMin / 60);
		const diffHari = Math.floor(diffJam / 24);

		if (diffMin < 1) return 'Baru saja';
		if (diffMin < 60) return `${diffMin} menit lalu`;
		if (diffJam < 24) return `${diffJam} jam lalu`;
		if (diffHari === 1) return 'Kemarin';
		if (diffHari < 7) return `${diffHari} hari lalu`;
		return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
	}

	// Titik kalender bulan ini diambil dari riwayat siram/pupuk yang beneran tercatat
	function getMarkers(day: number) {
		const dots: ('primary' | 'accent')[] = [];

		for (const logs of Object.values(historyByPlant)) {
			for (const log of logs) {
				const d = new Date(log.activityDate);
				if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
					if (log.activityType === 'watering' && !dots.includes('primary')) dots.push('primary');
					if (log.activityType === 'fertilizing' && !dots.includes('accent')) dots.push('accent');
				}
			}
		}

		return { dots };
	}
</script>

<Navbar />

<div class="page">
	<div class="greeting">
		<p class="greeting-name">Halo{userLabel ? `, ${userLabel}` : ''} 👋</p>
		<p class="greeting-date">{hariIni}</p>
	</div>

	<Card>
		{#if cuaca}
			<div class="weather">
				<span class="weather-icon">{cuaca.icon}</span>
				<div>
					<p class="weather-temp">{cuaca.suhu}°C</p>
					<p class="weather-desc">{cuaca.kondisi}</p>
				</div>
			</div>
		{:else}
			<p class="status-text">Memuat cuaca...</p>
		{/if}
	</Card>

	{#if summary}
		<div class="stat-grid">
			<Card>
				<div class="stat-item">
					<span class="stat-number">{summary.totalPlants}</span>
					<span class="stat-label">Total Tanaman</span>
				</div>
			</Card>
			<Card>
				<div class="stat-item" class:urgent={summary.needWatering > 0}>
					<span class="stat-number">{summary.needWatering}</span>
					<span class="stat-label">💧 Butuh Disiram</span>
				</div>
			</Card>
			<Card>
				<div class="stat-item" class:urgent={summary.needFertilizing > 0}>
					<span class="stat-number">{summary.needFertilizing}</span>
					<span class="stat-label">🌱 Butuh Dipupuk</span>
				</div>
			</Card>
		</div>
	{/if}

	<Calendar {namaBulan} days={calendarDays} filledDay={today.getDate()} {getMarkers}>
		{#snippet legend()}
			<span class="legend-item"><span class="legend-dot primary"></span> Disiram</span>
			<span class="legend-item"><span class="legend-dot accent"></span> Dipupuk</span>
		{/snippet}
	</Calendar>

	<div class="activity-header">
		<h2 class="section-title">Aktivitas Terbaru</h2>
		<span class="section-hint">Riwayat siram & pupuk</span>
	</div>

	<div class="activity-list">
		{#if isLoading}
			<p class="status-text">Memuat aktivitas...</p>
		{:else if errorMessage}
			<p class="status-text error">{errorMessage}</p>
		{:else if aktivitasTerbaru.length === 0}
			<p class="status-text">Belum ada aktivitas siram atau pupuk yang tercatat.</p>
		{:else}
			{#each aktivitasTerbaru as item (item.id)}
				<Card>
					<div class="activity-row">
						<span class="activity-icon {item.type}">
							{item.type === 'siram' ? '💧' : '🌱'}
						</span>
						<div class="activity-info">
							<p class="activity-name">
								{item.name} · {item.type === 'siram' ? 'disiram' : 'dipupuk'}
							</p>
							<p class="activity-time">{item.waktu}</p>
						</div>
					</div>
				</Card>
			{/each}
		{/if}
	</div>
</div>

<style>
	.page {
		padding: 1rem;
		max-width: 28rem;
		margin: 0 auto;
	}

	.greeting {
		margin-bottom: 1rem;
	}

	.greeting-name {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-primary-dark);
	}

	.greeting-date {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-transform: capitalize;
	}

	.weather {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.weather-icon {
		font-size: 1.875rem;
	}

	.weather-temp {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.weather-desc {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.stat-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.125rem;
	}

	.stat-number {
		font-size: 1.375rem;
		font-weight: 700;
		color: var(--color-primary-dark);
	}

	.stat-item.urgent .stat-number {
		color: var(--color-danger-dark);
	}

	.stat-label {
		font-size: 0.6875rem;
		color: var(--color-text-muted);
	}

	.status-text {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		text-align: center;
		padding: 0.5rem 0;
	}

	.status-text.error {
		color: var(--color-danger-dark);
	}

	.activity-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.section-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.section-hint {
		font-size: 10px;
		color: var(--color-text-muted);
	}

	.activity-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.activity-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.activity-icon {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.activity-icon.siram {
		background-color: var(--color-primary-light);
	}

	.activity-icon.pupuk {
		background-color: var(--color-accent-soft);
	}

	.activity-info {
		flex: 1;
		min-width: 0;
	}

	.activity-name {
		font-weight: 500;
		font-size: 0.875rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.activity-time {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.legend-dot {
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 9999px;
	}

	.legend-dot.primary {
		background-color: var(--color-primary);
	}

	.legend-dot.accent {
		background-color: var(--color-accent);
	}
</style>