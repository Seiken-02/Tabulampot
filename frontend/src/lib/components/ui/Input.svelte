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
	<label for={inputId} class="text-xs text-gray-500 mb-1 block">{label}</label>
{/if}

<input 
	id={inputId}
	{type} 
	{placeholder} 
	bind:value 
	class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
/>