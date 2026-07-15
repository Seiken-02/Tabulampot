<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getPlantTypes } from '$lib/api/plant-types';
	import { createPlant } from '$lib/api/plants';
	import type { PlantType } from '$lib/types';

	let name = $state('');
	let plantType = $state('');
	let plantedAt = $state('');

	let plantTypes = $state<PlantType[]>([]);
	let isLoadingTypes = $state(true);
	let loadError = $state('');

	let isSubmitting = $state(false);
	let submitError = $state('');

	const plantTypeOptions = $derived(
		plantTypes.map((t) => ({ value: String(t.id), label: t.name }))
	);

	$effect(() => {
		loadPlantTypes();
	});

	async function loadPlantTypes() {
		isLoadingTypes = true;
		loadError = '';

		try {
			plantTypes = await getPlantTypes();

			if (plantTypes.length > 0) {
				plantType = String(plantTypes[0].id);
			}
		} catch (err) {
			loadError = err instanceof Error ? err.message : 'Gagal memuat jenis tanaman.';
		} finally {
			isLoadingTypes = false;
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
			await createPlant({
				plantTypeId: Number(plantType),
				nickname: name,
				plantingDate: plantedAt || undefined
			});

			goto(resolve('/plants'));
		} catch (err) {
			submitError = err instanceof Error ? err.message : 'Gagal menyimpan tanaman.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Navbar />

<div class="page">
	<Card>
		<h1 class="title">Tambah Tanaman</h1>

		<div class="field">
			<Input label="Nama tanaman" placeholder="mis. Mangga Harum" bind:value={name} />
		</div>

		<div class="field">
			<Select
				label="Jenis tanaman"
				options={isLoadingTypes ? [{ value: '', label: 'Memuat...' }] : plantTypeOptions}
				bind:value={plantType}
				disabled={isLoadingTypes || plantTypeOptions.length === 0}
			/>
			{#if loadError}
				<p class="field-error">{loadError}</p>
			{/if}
		</div>

		<div class="field">
			<Input label="Tanggal tanam" type="date" bind:value={plantedAt} />
		</div>

		<div class="info-box">
			<span class="info-icon">ℹ️</span>
			<p class="info-text">
				Jadwal siram & pupuk dihitung otomatis dari jenis tanaman.
			</p>
		</div>

		{#if submitError}
			<p class="field-error">{submitError}</p>
		{/if}

		<Button
			variant="primary"
			onclick={handleSubmit}
			disabled={isLoadingTypes || isSubmitting}
			class="submit-btn"
		>
			{isSubmitting ? 'Menyimpan...' : 'Simpan tanaman'}
		</Button>
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

	.info-box {
		background-color: var(--color-primary-light);
		border-radius: var(--radius-md);
		padding: 0.75rem;
		margin: 1rem 0;
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.info-icon {
		font-size: 0.875rem;
	}

	.info-text {
		font-size: 0.75rem;
		color: var(--color-primary-dark);
	}

	:global(.submit-btn) {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>