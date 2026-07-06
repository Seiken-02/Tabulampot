<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="bg-white rounded-2xl border border-gray-200 p-4">
	{@render children()}
</div>