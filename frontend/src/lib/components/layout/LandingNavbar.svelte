<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<nav class="navbar">
	<span class="brand">Tabulampot</span>

	<div class="nav-actions">
		<a href={resolve('/login')} class="nav-link">
			Masuk
		</a>
		<a href={resolve('/register')}>
			<Button variant="primary">Daftar</Button>
		</a>
	</div>
</nav>

<style>
	.navbar {
		max-width: 64rem; /* max-w-5xl */
		margin: 0 auto;
		padding: 1.25rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.brand {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-primary-dark);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.nav-link {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-muted);
		transition: color 0.2s ease;
	}

	.nav-link:hover {
		color: var(--color-primary);
	}
</style>