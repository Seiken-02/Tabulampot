<script lang="ts">
	interface Props {
		value: string;
		label?: string;
		type?: 'text' | 'email' | 'password' | 'date';
		placeholder?: string;
	}

	let { 
		value = $bindable(''), 
		label, 
		type = 'text', 
		placeholder 
	}: Props = $props();

	const inputId = crypto.randomUUID();
</script>

{#if label}
	<label for={inputId} class="input-label">{label}</label>
{/if}

<input 
	id={inputId}
	{type} 
	{placeholder} 
	bind:value 
	class="text-input"
/>

<style>
	.input-label {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-bottom: 0.25rem;
		display: block;
	}

	.text-input {
		width: 100%;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 0.5rem 0.75rem;
	}

	.text-input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary);
	}
</style>