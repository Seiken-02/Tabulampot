<script lang="ts">

</script>

<footer class="footer">
	<div class="footer-inner">
		<span class="brand-name">🌿 Tabulampot</span>
		<p class="copyright">© 2026 Tabulampot. Dibuat untuk pekebun rumahan.</p>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-surface-muted);
		background-color: var(--color-surface);
		margin-top: 4rem;
	}

	.footer-inner {
		max-width: 64rem;
		margin: 0 auto;
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-align: center;
	}

	.brand-name {
		font-weight: 700;
		color: var(--color-primary-dark);
		font-size: 1rem;
	}

	.copyright {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	/* Setara md: breakpoint Tailwind (768px) */
	@media (min-width: 768px) {
		.footer-inner {
			flex-direction: row;
			justify-content: space-between;
			text-align: left;
		}
	}
</style>