<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Calendar from '$lib/components/ui/Calender.svelte';

	interface PlantHistoryItem {
		id: number;
		type: 'siram' | 'pupuk';
		date: string; 
	}

	interface Plant {
		id: string;
		name: string;
		planted_at: string; 
		status: string;
		history: PlantHistoryItem[];
	}

	let plant = $state<Plant | null>(null);
	let isLoading = $state(true);
	let errorMessage = $state('');

	$effect(() => {
		if (page.params.id) {
			loadPlant(page.params.id);
		}
	});

	async function loadPlant(id: string) {
		isLoading = true;
		errorMessage = '';

		try {
			// TODO: ganti URL sesuai endpoint backend
			const res = await fetch(`/api/plants/${id}`);

			if (!res.ok) {
				throw new Error(`Gagal memuat data (${res.status})`);
			}

			plant = await res.json();
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Gagal memuat data tanaman.';
		} finally {
			isLoading = false;
		}
	}

	const calendarMeta = $derived.by(() => {
		if (!plant) return null;

		const plantedDate = new Date(plant.planted_at);
		const year = plantedDate.getFullYear();
		const month = plantedDate.getMonth();
		const namaBulan = plantedDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		const days: (number | null)[] = [];
		for (let i = 0; i < firstDay; i++) days.push(null);
		for (let d = 1; d <= daysInMonth; d++) days.push(d);

		const today = new Date();
		const todayDay = today.getFullYear() === year && today.getMonth() === month ? today.getDate() : undefined;

		return { namaBulan, days, plantedDay: plantedDate.getDate(), todayDay, year, month };
	});

	const siramDays = $derived(
		new Set(
			(plant?.history ?? [])
				.filter((h) => h.type === 'siram')
				.map((h) => new Date(h.date).getDate())
		)
	);

	const pupukDays = $derived(
		new Set(
			(plant?.history ?? [])
				.filter((h) => h.type === 'pupuk')
				.map((h) => new Date(h.date).getDate())
		)
	);

	function getMarkers(day: number) {
		const dots: ('primary' | 'accent')[] = [];
		if (siramDays.has(day)) dots.push('primary');
		if (pupukDays.has(day)) dots.push('accent');
		return { dots, emoji: day === calendarMeta?.plantedDay ? '🌱' : undefined };
	}

	function formatTanggal(iso: string): string {
		return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
	}

	function handleSiram() {
		console.log('Siram tanaman', plant?.id);
	}

	function handlePupuk() {
		console.log('Pupuk tanaman', plant?.id);
	}
</script>

<Navbar />

<div class="page">
	{#if isLoading}
		<p class="status-text">Memuat data tanaman...</p>
	{:else if errorMessage}
		<p class="status-text error">{errorMessage}</p>
	{:else if plant && calendarMeta}
		<!-- Kartu info tanaman: nama, tanggal tanam, status, dan tombol aksi -->
		<Card>
			<div class="plant-header">
				<div class="plant-icon">🌿</div>
				<div class="plant-info">
					<p class="plant-name">{plant.name}</p>
					<p class="plant-date">Ditanam {formatTanggal(plant.planted_at)}</p>
				</div>
				<Badge text={plant.status} variant={plant.status === 'Sehat' ? 'success' : 'danger'} />
			</div>

			<div class="action-grid">
				<Button variant="secondary" onclick={handleSiram} class="action-btn">
					💧 Siram
				</Button>
				<Button variant="primary" onclick={handlePupuk} class="action-btn">
					🌱 Pupuk
				</Button>
			</div>
		</Card>

		<Calendar
			namaBulan={calendarMeta.namaBulan}
			days={calendarMeta.days}
			filledDay={calendarMeta.plantedDay}
			ringDay={calendarMeta.todayDay}
			{getMarkers}
		>
			{#snippet legend()}
				<span class="legend-item">🌱 Tanggal tanam</span>
				<span class="legend-item"><span class="legend-ring"></span> Hari ini</span>
				<span class="legend-item"><span class="legend-dot primary"></span> Disiram</span>
				<span class="legend-item"><span class="legend-dot accent"></span> Dipupuk</span>
			{/snippet}
		</Calendar>
	{/if}
</div>

<style>
	.page {
		padding: 1rem;
		max-width: 28rem;
		margin: 0 auto;
	}

	.status-text {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		text-align: center;
		padding: 2rem 0;
	}

	.status-text.error {
		color: var(--color-danger-dark);
	}

	.plant-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.plant-icon {
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius-xl);
		background-color: var(--color-accent-soft);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.plant-info {
		flex: 1;
	}

	.plant-name {
		font-weight: 700;
	}

	.plant-date {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.action-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	:global(.action-btn) {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
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

	.legend-ring {
		width: 0.625rem;
		height: 0.625rem;
		border-radius: 9999px;
		border: 2px solid var(--color-primary);
	}
</style>