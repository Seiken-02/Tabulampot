<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let name = $state('');
	let plantType = $state('mangga');
	let plantedAt = $state('');

	const plantTypeOptions = [
		{ value: 'mangga', label: 'Mangga' },
		{ value: 'jeruk', label: 'Jeruk' },
		{ value: 'jambu', label: 'Jambu' }
	];

	function handleSubmit() {
		console.log('Nama:', name);
		console.log('Jenis:', plantType);
		console.log('Tanggal tanam:', plantedAt);
		goto(resolve('/plants'));
	}
</script>

<Navbar />

<div class="p-4 max-w-md mx-auto">
	<Card>
		<h1 class="text-lg font-bold text-primary-dark mb-4">Tambah Tanaman</h1>

		<Input label="Nama tanaman" placeholder="mis. Mangga Harum" bind:value={name} />
		<Select label="Jenis tanaman" options={plantTypeOptions} bind:value={plantType} />
		<Input label="Tanggal tanam" type="date" bind:value={plantedAt} />

		<div class="bg-primary-light rounded-lg p-3 my-4 flex gap-2 items-start">
			<span class="text-sm">ℹ️</span>
			<p class="text-xs text-primary-dark">
				Jadwal siram & pupuk dihitung otomatis dari jenis tanaman.
			</p>
		</div>

		<Button variant="primary" onclick={handleSubmit} class="w-full flex items-center justify-center">
			Simpan tanaman
		</Button>
	</Card>
</div>