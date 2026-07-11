<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Calendar from '$lib/components/ui/Calender.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { isLoggedIn } from '$lib/stores/auth.svelte';

onMount(() => {
	if (!isLoggedIn()) {
		goto(resolve('/login'));
	}
});

	// TODO: 
	// (+page.server.ts) yang fetch dari activity_logs, plant_types, dan API cuaca.
	interface DashboardData {
		userName: string;
		cuaca: { suhu: number; kondisi: string; icon: string };
		tanggalSiram: number[];
		tanggalPupuk: number[];
		tanggalHujan: number[];
		aktivitasTerbaru: { id: number; name: string; type: 'siram' | 'pupuk'; status: string }[];
	}

	let { data }: { data: DashboardData } = $props();

	const today = new Date();
	const hariIni = today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
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

	function isHujan(day: number) {
		return data.tanggalHujan.includes(day);
	}

	// Diberikan ke <Calendar> untuk nentuin titik & ikon tiap tanggal
	function getMarkers(day: number) {
		const dots: ('primary' | 'accent')[] = [];
		if (data.tanggalSiram.includes(day) && !isHujan(day)) dots.push('primary');
		if (data.tanggalPupuk.includes(day)) dots.push('accent');
		return { dots, emoji: isHujan(day) ? '🌧️' : undefined };
	}
</script>

<Navbar />

<div class="page">
	<div class="greeting">
		<p class="greeting-name">Halo, {data.userName} 👋</p>
		<p class="greeting-date">{hariIni}</p>
	</div>

	<Card>
		<div class="weather">
			<span class="weather-icon">{data.cuaca.icon}</span>
			<div>
				<p class="weather-temp">{data.cuaca.suhu}°C</p>
				<p class="weather-desc">{data.cuaca.kondisi}</p>
			</div>
		</div>
	</Card>

	<Calendar {namaBulan} days={calendarDays} filledDay={today.getDate()} {getMarkers}>
		{#snippet legend()}
			<span class="legend-item"><span class="legend-dot primary"></span> Perlu disiram</span>
			<span class="legend-item"><span class="legend-dot accent"></span> Perlu dipupuk</span>
			<span class="legend-item">🌧️ Hujan</span>
		{/snippet}
	</Calendar>

	<div class="activity-header">
		<h2 class="section-title">Aktivitas Terbaru</h2>
		<span class="section-hint">Update tiap hari</span>
	</div>

	<div class="activity-list">
		{#each data.aktivitasTerbaru as item (item.id)}
			<Card>
				<div class="activity-row">
					<span class="activity-icon {item.type}">
						{item.type === 'siram' ? '💧' : '🌱'}
					</span>
					<div class="activity-info">
						<p class="activity-name">{item.name}</p>
					</div>
					<Badge text={item.status} variant={item.status === 'Mendesak' ? 'danger' : 'success'} />
				</div>
			</Card>
		{/each}
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