<script lang="ts">
	interface Props {
		text: string;
		variant?: 'success' | 'danger';
	}

	let { text, variant = 'success' }: Props = $props();
</script>

<span class="badge {variant}">
	{text}
</span>

<style>
	.badge {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 9999px;
		font-weight: 500;
	}

	.badge.success {
		background-color: var(--color-accent-light);
		color: var(--color-text);
	}

	.badge.danger {
		background-color: var(--color-danger-light);
		color: var(--color-danger-dark);
	}
</style>