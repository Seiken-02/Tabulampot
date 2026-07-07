<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<nav class="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
	<span class="text-lg font-bold text-primary-dark">Tabulampot</span>

	<div class="flex items-center gap-3">
		<a href={resolve('/login')} class="text-sm font-medium text-gray-600 hover:text-primary">
			Masuk
		</a>
		<a href={resolve('/register')}>
			<Button variant="primary">Daftar</Button>
		</a>
	</div>
</nav>