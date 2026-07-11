<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { loginUser } from '$lib/api/auth';
	import { setToken } from '$lib/stores/auth.svelte';

	let isLoading = $state(false);
	let errorMessage = $state('');
	let email = $state('');
	let password = $state('');
	async function handleLogin() {
	errorMessage = '';
	isLoading = true;
	try {
		const result = await loginUser({ email, password });
		setToken(result.token);
		goto(resolve('/dashboard'));
	} catch (err) {
		errorMessage = err instanceof Error ? err.message : 'Login gagal';
	} finally {
		isLoading = false;
	}
}

	

</script>

<div class="page">
	<Card>
		<h1 class="title">Tabulampot</h1>

		<div class="field">
			<Input label="Email" type="email" placeholder="nama@email.com" bind:value={email} />
		</div>
		<div class="field">
			<Input label="Password" type="password" placeholder="••••••••" bind:value={password} />
		</div>
		{#if errorMessage}
			<p style="color: var(--color-danger-dark); font-size: 0.75rem; margin-bottom: 0.75rem;">
				{errorMessage}
			</p>
		{/if}
		<Button variant="primary" onclick={handleLogin} class="w-full flex items-center justify-center">
			{isLoading ? 'Memproses...' : 'Masuk'}
		</Button>

		<p class="footer-text">
			belum punya akun? <a href={resolve('/register')} class="link">Daftar</a>
		</p>
	</Card>
</div>

<style>
	.page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-surface);
	}

	.title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-primary-dark);
		margin-bottom: 1rem;
		text-align: center;
	}

	.field {
		margin-bottom: 0.75rem;
	}

	:global(.submit-btn) {
		width: 100%;
		margin-top: 0.25rem;
	}

	.footer-text {
		font-size: 0.75rem;
		text-align: center;
		color: var(--color-text-muted);
		margin-top: 0.75rem;
	}

	.link {
		color: var(--color-primary);
	}
</style>