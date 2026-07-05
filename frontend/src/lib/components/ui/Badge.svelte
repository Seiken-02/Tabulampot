<script lang="ts">
	interface Props {
		text: string;
		variant?: 'success' | 'danger';
	}

	let { text, variant = 'success' }: Props = $props();
</script>

<span class="text-xs px-2 py-1 rounded-full font-medium {variant === 'success' ? 'bg-accent-light text-green-900' : 'bg-red-200 text-red-900'}">
	{text}
</span>