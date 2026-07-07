<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary';
		type?: 'button' | 'submit';
		onclick?: () => void;
		children: Snippet;
		class?: string;
	}

	let { 
		variant = 'primary', 
		type = 'button', 
		onclick, 
		children,
		class: className = ''
	}: Props = $props();
</script>

<button
	{type}
	{onclick}
	class="px-4 py-2 rounded-lg font-medium transition-colors {variant === 'primary'
		? 'bg-accent text-white hover:bg-accent-light'
		: 'bg-primary text-white hover:bg-primary-dark'} {className}"
>
	{@render children()}
</button>