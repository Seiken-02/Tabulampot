<script lang="ts">
	interface OptionItem {
		value: string;
		label: string;
	}

	interface Props {
		value: string;
		label?: string;
		options: OptionItem[];
	}

	let { value = $bindable(''), label, options }: Props = $props();

	const selectId = crypto.randomUUID();
</script>

{#if label}
	<label for={selectId} class="text-xs text-gray-500 mb-1 block">{label}</label>
{/if}

<select id={selectId} bind:value class="w-full border border-gray-300 rounded-lg px-3 py-2">
	{#each options as option (option.value)}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>