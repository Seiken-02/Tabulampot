<script lang="ts">
	interface OptionItem {
		value: string;
		label: string;
	}

	interface Props {
		value: string;
		label?: string;
		options: OptionItem[];
		disabled?: boolean;
	}

	let { value = $bindable(''), label, options, disabled = false }: Props = $props();

	const selectId = crypto.randomUUID();
</script>

{#if label}
	<label for={selectId} class="select-label">{label}</label>
{/if}

<select id={selectId} bind:value {disabled} class="select-input">
	{#each options as option (option.value)}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

<style>
	.select-label {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-bottom: 0.25rem;
		display: block;
	}

	.select-input {
		width: 100%;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 0.5rem 0.75rem;
	}

	.select-input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary);
	}

	.select-input:disabled {
		background-color: var(--color-surface-muted);
		color: var(--color-text-muted);
		cursor: not-allowed;
	}
</style>