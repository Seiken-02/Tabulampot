<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary';
		type?: 'button' | 'submit';
		onclick?: () => void;
		disabled?: boolean;
		children: Snippet;
		class?: string;
	}

	let {
		variant = 'primary',
		type = 'button',
		onclick,
		disabled = false,
		children,
		class: className = ''
	}: Props = $props();
</script>

<button {type} {onclick} {disabled} class="btn {variant} {className}">
	{@render children()}
</button>

<style>
	.btn {
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		font-weight: 500;
		border: none;
		transition: background-color 0.2s ease, opacity 0.2s ease;
		color: var(--color-white);
	}

	.btn.primary {
		background-color: var(--color-accent);
	}
	.btn.primary:hover:not(:disabled) {
		background-color: var(--color-accent-light);
	}

	.btn.secondary {
		background-color: var(--color-primary);
	}
	.btn.secondary:hover:not(:disabled) {
		background-color: var(--color-primary-dark);
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>