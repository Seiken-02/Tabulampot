<script lang="ts">
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { getPlants } from '$lib/api/plants';
	import { getPlantTypes } from '$lib/api/plant-types';
	import { getPlantIcon } from '$lib/utils/plant-icon';
	import type { Plant, PlantType } from '$lib/types';

	let plants = $state<Plant[]>([]);
	let plantTypes = $state<PlantType[]>([]);
	let isLoading = $state(true);
	let errorMessage = $state('');

	let showScrollTop = $state(false);

	$effect(() => {
		loadData();
	});

	$effect(() => {
		function handleScroll() {
			showScrollTop = window.scrollY > 300;
		}
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function loadData() {
		isLoading = true;
		errorMessage = '';

		try {
			const [plantsResult, typesResult] = await Promise.all([getPlants(), getPlantTypes()]);
			plants = plantsResult;
			plantTypes = typesResult;
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Gagal memuat data tanaman.';
		} finally {
			isLoading = false;
		}
	}

	function getType(plantTypeId: number): PlantType | undefined {
		return plantTypes.find((t) => t.id === plantTypeId);
	}

	function formatTanggal(iso: string | null): string {
		if (!iso) return 'Belum diisi';
		return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
	}
</script>

<Navbar />

<div class="page">
	<div class="header">
		<h1 class="title">Daftar Tanaman</h1>
		<a href={resolve('/plants/add')} class="add-btn">
			+
		</a>
	</div>

	<div class="plant-list">
		{#if isLoading}
			<p class="status-text">Memuat tanaman...</p>
		{:else if errorMessage}
			<p class="status-text error">{errorMessage}</p>
		{:else if plants.length === 0}
			<p class="status-text">Belum ada tanaman. Tambahkan yang pertama!</p>
		{:else}
			{#each plants as plant (plant.id)}
				{@const type = getType(plant.plantTypeId)}
				<a href={resolve('/plants/[id]', { id: String(plant.id) })} class="plant-link">
					<Card>
						<div class="plant-row">
							<div class="plant-icon">{getPlantIcon(type?.name)}</div>
							<div class="plant-info">
								<p class="plant-name">{plant.nickname}</p>
								<p class="plant-date">Ditanam {formatTanggal(plant.plantingDate)}</p>
							</div>
							<Badge text={type?.name ?? 'Tidak diketahui'} variant="success" />
						</div>
					</Card>
				</a>
			{/each}
		{/if}
	</div>
</div>

{#if showScrollTop}
	<button onclick={scrollToTop} class="scroll-top-btn" aria-label="Kembali ke atas">
		↑
	</button>
{/if}

<style>
	.page {
		padding: 1rem;
		max-width: 28rem;
		margin: 0 auto;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-primary-dark);
	}

	.add-btn {
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-md);
		background-color: var(--color-accent);
		color: var(--color-white);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.125rem;
	}

	.plant-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.plant-link {
		display: block;
	}

	.plant-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.plant-icon {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-md);
		background-color: var(--color-accent-soft);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.plant-info {
		flex: 1;
		min-width: 0;
	}

	.plant-name {
		font-weight: 500;
	}

	.plant-date {
		font-size: 0.75rem;
		color: var(--color-text-muted);
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

	.scroll-top-btn {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 9999px;
		background-color: var(--color-primary);
		color: var(--color-white);
		border: none;
		font-size: 1.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
		transition: background-color 0.2s ease, transform 0.15s ease;
		z-index: 30;
	}

	.scroll-top-btn:hover {
		background-color: var(--color-primary-dark);
	}

	.scroll-top-btn:active {
		transform: scale(0.92);
	}
</style>