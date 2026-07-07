<script lang="ts">
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	const plants = [
		{ id: 1, name: 'Mangga Harum', planted_at: '3 Jun 2026', status: 'Sehat' },
		{ id: 2, name: 'Jeruk Nipis', planted_at: '15 Mei 2026', status: 'Siram!' },
		{ id: 3, name: 'Jambu Kristal', planted_at: '1 Jun 2026', status: 'Sehat' }
	];
</script>

<Navbar />
<div class="p-4 max-w-md mx-auto">
	<div class="flex items-center justify-between mb-3">
		<h1 class="text-lg font-bold text-primary-dark">Daftar Tanaman</h1>
		<a href={resolve('/plants/add')} class="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center text-lg">
			+
		</a>
	</div>

<div class="p-4 max-w-md mx-auto flex flex-col gap-3">
	{#each plants as plant (plant.id)}
		<a href={resolve('/plants/[id]', { id: String(plant.id) })}>
			<Card>
				<div class="flex items-center justify-between">
					<div>
						<p class="font-medium">{plant.name}</p>
						<p class="text-xs text-gray-500">Ditanam {plant.planted_at}</p>
					</div>
					<Badge 
						text={plant.status} 
						variant={plant.status === 'Sehat' ? 'success' : 'danger'} 
					/>
				</div>
			</Card>
		</a>
	{/each}
</div>
</div>