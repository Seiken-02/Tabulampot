<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getPlantTypes } from '$lib/api/plant-types';
	import { getPlantById, updatePlant } from '$lib/api/plants';
	import type { PlantType } from '$lib/types';

	let name = $state('');
	let plantType = $state('');
	let plantedAt = $state('');
	let location = $state('');
	let notes = $state('');

	let plantTypes = $state<PlantType[]>([]);
	let isLoading = $state(true);
	let loadError = $state('');

	let isSubmitting = $state(false);
	let submitError = $state('');

	const plantTypeOptions = $derived(plantTypes.map((t) => ({ value: String(t.id), label: t.name })));

	$effect(() => {
		if (page.params.id) {
			loadData(page.params.id);
		}
	});

	async function loadData(id: string) {
		isLoading = true;
		loadError = '';

		try {
			const [plant, types] = await Promise.all([getPlantById(id), getPlantTypes()]);
			plantTypes = types;
			name = plant.nickname;
			plantType = String(plant.plantTypeId);
			plantedAt = plant.plantingDate ? plant.plantingDate.slice(0, 10) : '';
			location = plant.location ?? '';
			notes = plant.notes ?? '';
		} catch (err) {
			loadError = err instanceof Error ? err.message : 'Gagal memuat data tanaman.';
		} finally {
			isLoading = false;
		}
	}

	async function handleSubmit() {
		if (!name || !plantType) {
			submitError = 'Nama dan jenis tanaman wajib diisi.';
			return;
		}

		isSubmitting = true;
		submitError = '';

		try {
			await updatePlant(page.params.id!, {
				plantTypeId: Number(plantType),
				nickname: name,
				plantingDate: plantedAt || undefined,
				location: location || undefined,
				notes: notes || undefined
			});

			goto(resolve('/plants/[id]', { id: page.params.id! }));
		} catch (err) {
			submitError = err instanceof Error ? err.message : 'Gagal menyimpan perubahan.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Navbar />

<div class="page">
	<Card>
		<h1 class="title">Edit Tanaman</h1>

		{#if isLoading}
			<p class="status-text">Memuat data tanaman...</p>
		{:else if loadError}
			<p class="status-text error">{loadError}</p>
		{:else}
			<div class="field">
				<Input label="Nama tanaman" placeholder="mis. Mangga Harum" bind:value={name} />
			</div>

			<div class="field">
				<Select
					label="Jenis tanaman"
					options={plantTypeOptions}
					bind:value={plantType}
					disabled={plantTypeOptions.length === 0}
				/>
			</div>

			<div class="field">
				<Input label="Tanggal tanam" type="date" bind:value={plantedAt} />
			</div>

			<div class="field">
				<Input label="Lokasi" placeholder="mis. Halaman belakang" bind:value={location} />
			</div>

			<div class="field">
				<Input label="Catatan" placeholder="Opsional" bind:value={notes} />
			</div>

			{#if submitError}
				<p class="field-error">{submitError}</p>
			{/if}

			<Button
				variant="primary"
				onclick={handleSubmit}
				disabled={isSubmitting}
				class="submit-btn"
			>
				{isSubmitting ? 'Menyimpan...' : 'Simpan perubahan'}
			</Button>
		{/if}
	</Card>
</div>

<style>
	.page {
		padding: 1rem;
		max-width: 28rem;
		margin: 0 auto;
	}

	.title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-primary-dark);
		margin-bottom: 1rem;
	}

	.field {
		margin-bottom: 0.75rem;
	}

	.field-error {
		font-size: 0.75rem;
		color: var(--color-danger-dark);
		margin-top: 0.25rem;
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

	:global(.submit-btn) {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>