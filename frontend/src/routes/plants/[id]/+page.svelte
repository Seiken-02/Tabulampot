<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Calendar from '$lib/components/ui/Calender.svelte';
	import { getPlantById, getPlantHistory, waterPlant, fertilizePlant } from '$lib/api/plants';
	import { getPlantTypes } from '$lib/api/plant-types';
	import type { Plant, ActivityLog, PlantType } from '$lib/types';

	let plant = $state<Plant | null>(null);
	let history = $state<ActivityLog[]>([]);
	let plantTypes = $state<PlantType[]>([]);

	let isLoading = $state(true);
	let errorMessage = $state('');
	let isActionLoading = $state(false);

	$effect(() => {
		if (page.params.id) {
			loadData(page.params.id);
		}
	});

	async function loadData(id: string) {
		isLoading = true;
		errorMessage = '';

		try {
			const [plantResult, historyResult, typesResult] = await Promise.all([
				getPlantById(id),
				getPlantHistory(id),
				getPlantTypes()
			]);
			plant = plantResult;
			history = historyResult;
			plantTypes = typesResult;
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Gagal memuat data tanaman.';
		} finally {
			isLoading = false;
		}
	}

	const plantType = $derived(plantTypes.find((t) => t.id === plant?.plantTypeId));

	const siramDays = $derived(
		new Set(
			history
				.filter((h) => h.activityType === 'watering')
				.map((h) => new Date(h.activityDate).getDate())
		)
	);

	const pupukDays = $derived(
		new Set(
			history
				.filter((h) => h.activityType === 'fertilizing')
				.map((h) => new Date(h.activityDate).getDate())
		)
	);

	// Status kesehatan dihitung dari tanggal siram terakhir dibanding wateringInterval jenis tanaman
	const status = $derived.by(() => {
		if (!plantType) return 'Sehat';

		const wateringLogs = history
			.filter((h) => h.activityType === 'watering')
			.sort((a, b) => new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime());

		if (wateringLogs.length === 0) return 'Siram!';

		const lastWatered = new Date(wateringLogs[0].activityDate);
		const daysSince = Math.floor((Date.now() - lastWatered.getTime()) / (1000 * 60 * 60 * 24));

		return daysSince >= plantType.wateringInterval ? 'Siram!' : 'Sehat';
	});

	// Kalender ditampilkan untuk bulan tanggal tanam (kalau ada), fallback ke bulan sekarang
	const calendarMeta = $derived.by(() => {
		const baseDate = plant?.plantingDate ? new Date(plant.plantingDate) : new Date();
		const year = baseDate.getFullYear();
		const month = baseDate.getMonth();
		const namaBulan = baseDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		const days: (number | null)[] = [];
		for (let i = 0; i < firstDay; i++) days.push(null);
		for (let d = 1; d <= daysInMonth; d++) days.push(d);

		const today = new Date();
		const todayDay = today.getFullYear() === year && today.getMonth() === month ? today.getDate() : undefined;

		const plantedDay =
			plant?.plantingDate &&
			new Date(plant.plantingDate).getFullYear() === year &&
			new Date(plant.plantingDate).getMonth() === month
				? new Date(plant.plantingDate).getDate()
				: undefined;

		return { namaBulan, days, plantedDay, todayDay };
	});

	function getMarkers(day: number) {
		const dots: ('primary' | 'accent')[] = [];
		if (siramDays.has(day)) dots.push('primary');
		if (pupukDays.has(day)) dots.push('accent');
		return { dots, emoji: day === calendarMeta.plantedDay ? '🌱' : undefined };
	}

	function formatTanggal(iso: string | null): string {
		if (!iso) return 'Belum diisi';
		return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
	}

	async function handleSiram() {
		if (!plant) return;
		isActionLoading = true;
		try {
			await waterPlant(String(plant.id));
			history = await getPlantHistory(String(plant.id));
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Gagal mencatat siram.';
		} finally {
			isActionLoading = false;
		}
	}

	async function handlePupuk() {
		if (!plant) return;
		isActionLoading = true;
		try {
			await fertilizePlant(String(plant.id));
			history = await getPlantHistory(String(plant.id));
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Gagal mencatat pupuk.';
		} finally {
			isActionLoading = false;
		}
	}
	// Hitung jadwal siram/pupuk berikutnya
	function getNextSchedule(activityType: 'watering' | 'fertilizing', intervalDays: number) {
		const logs = history
			.filter((h) => h.activityType === activityType)
			.sort((a, b) => new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime());

		const baseDateStr = logs[0]?.activityDate ?? plant?.plantingDate ?? new Date().toISOString();
		const baseDate = new Date(baseDateStr);

		const daysSince = Math.floor((Date.now() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
		const daysLeft = intervalDays - daysSince;

		return daysLeft;
	}

	const nextWatering = $derived.by(() => {
		if (!plantType) return null;
		return getNextSchedule('watering', plantType.wateringInterval);
	});

	const nextFertilizing = $derived.by(() => {
		if (!plantType) return null;
		return getNextSchedule('fertilizing', plantType.fertilizingInterval);
	});

	function scheduleLabel(daysLeft: number | null, actionLabel: string): string {
		if (daysLeft === null) return '';
		if (daysLeft <= 0) return `Perlu ${actionLabel} sekarang!`;
		if (daysLeft === 1) return `${actionLabel} lagi besok`;
		return `${actionLabel} lagi ${daysLeft} hari`;
	}
	import { getPlantIcon } from '$lib/utils/plant-icon';
</script>

<Navbar />

<div class="page">
	{#if isLoading}
		<p class="status-text">Memuat data tanaman...</p>
	{:else if errorMessage && !plant}
		<p class="status-text error">{errorMessage}</p>
	{:else if plant}
		<Card>
			<div class="plant-header">
				<div class="plant-icon">{getPlantIcon(plantType?.name)}</div>
				<div class="plant-info">
					<p class="plant-name">{plant.nickname}</p>
					<p class="plant-date">
						{plantType?.name ?? 'Tidak diketahui'} · Ditanam {formatTanggal(plant.plantingDate)}
					</p>
				</div>
				<Badge text={status} variant={status === 'Sehat' ? 'success' : 'danger'} />
			</div>

			{#if errorMessage}
				<p class="field-error">{errorMessage}</p>
			{/if}

			<div class="action-grid">
				<Button variant="secondary" onclick={handleSiram} disabled={isActionLoading} class="action-btn">
					💧 Siram
				</Button>
				<Button variant="primary" onclick={handlePupuk} disabled={isActionLoading} class="action-btn">
					🌱 Pupuk
				</Button>
			</div>
		</Card>
		<div class="schedule-grid">
			<div class="schedule-item" class:urgent={nextWatering !== null && nextWatering <= 0}>
				<span class="schedule-icon">💧</span>
				<p class="schedule-text">{scheduleLabel(nextWatering, 'disiram')}</p>
			</div>
			<div class="schedule-item" class:urgent={nextFertilizing !== null && nextFertilizing <= 0}>
				<span class="schedule-icon">🌱</span>
				<p class="schedule-text">{scheduleLabel(nextFertilizing, 'dipupuk')}</p>
			</div>
		</div>

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

	.field-error {
		font-size: 0.75rem;
		color: var(--color-danger-dark);
		margin-bottom: 0.75rem;
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
	.schedule-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;
	margin: 0.75rem 0 1.5rem;
}

.schedule-item {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	background-color: var(--color-surface-muted);
	border-radius: var(--radius-md);
	padding: 0.625rem 0.75rem;
}

.schedule-item.urgent {
	background-color: var(--color-danger-light);
}

.schedule-icon {
	font-size: 1rem;
}

.schedule-text {
	font-size: 0.75rem;
	font-weight: 500;
	color: var(--color-text);
}

.schedule-item.urgent .schedule-text {
	color: var(--color-danger-dark);
}
</style>