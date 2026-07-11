<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="card">
	{@render children()}
</div>

<style>
	.card {
		background-color: var(--color-white);
		border-radius: var(--radius-xl);
		border: 1px solid var(--color-border);
		padding: 1rem;
	}
</style>