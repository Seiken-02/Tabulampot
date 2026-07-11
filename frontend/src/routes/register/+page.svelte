<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	
	let nama = $state('');
	let email = $state('');
	let password = $state('');

	function handleRegister() {
		console.log('Nama:', nama);
		console.log('Email:', email);
		console.log('Password:', password);
	}
</script>

<div class="page">
	<Card>
		<h1 class="title">Tabulampot</h1>

		<div class="field">
			<Input label="Nama" type="text" placeholder="nama" bind:value={nama} />
		</div>
		<div class="field">
			<Input label="Email" type="email" placeholder="nama@email.com" bind:value={email} />
		</div>
		<div class="field">
			<Input label="Password" type="password" placeholder="••••••••" bind:value={password} />
		</div>

		<Button variant="primary" onclick={handleRegister} class="submit-btn">Daftar</Button>

		<p class="footer-text">
			Sudah punya akun? <a href={resolve('/login')} class="link">Masuk</a>
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