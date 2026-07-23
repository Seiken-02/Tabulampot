<script lang="ts">
	interface Props {
		open: boolean;
		title: string;
		message: string;
		confirmText?: string;
		cancelText?: string;
		danger?: boolean;
		isLoading?: boolean;
		onConfirm: () => void;
		onCancel: () => void;
	}

	let {
		open,
		title,
		message,
		confirmText = 'Ya, lanjutkan',
		cancelText = 'Batal',
		danger = false,
		isLoading = false,
		onConfirm,
		onCancel
	}: Props = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) onCancel();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onCancel();
	}
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
	<div class="backdrop" onclick={handleBackdropClick} role="presentation">
		<div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
			<p id="confirm-title" class="title">{title}</p>
			<p class="message">{message}</p>

			<div class="actions">
				<button type="button" class="btn cancel" onclick={onCancel} disabled={isLoading}>
					{cancelText}
				</button>
				<button
					type="button"
					class="btn confirm"
					class:danger
					onclick={onConfirm}
					disabled={isLoading}
				>
					{isLoading ? 'Memproses...' : confirmText}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		z-index: 100;
	}

	.dialog {
		background-color: var(--color-white);
		border-radius: var(--radius-xl);
		padding: 1.25rem;
		width: 100%;
		max-width: 22rem;
		box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.15);
	}

	.title {
		font-weight: 700;
		font-size: 1rem;
		color: var(--color-text);
		margin-bottom: 0.5rem;
	}

	.message {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.5;
		margin-bottom: 1.25rem;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	.btn {
		flex: 1;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		font-weight: 500;
		font-size: 0.875rem;
		border: none;
		transition: background-color 0.2s ease, opacity 0.2s ease;
	}

	.btn.cancel {
		background-color: var(--color-surface-muted);
		color: var(--color-text);
	}

	.btn.cancel:hover:not(:disabled) {
		background-color: var(--color-border);
	}

	.btn.confirm {
		background-color: var(--color-accent);
		color: var(--color-white);
	}

	.btn.confirm:hover:not(:disabled) {
		background-color: var(--color-accent-light);
	}

	.btn.confirm.danger {
		background-color: var(--color-danger-dark);
	}

	.btn.confirm.danger:hover:not(:disabled) {
		opacity: 0.85;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>