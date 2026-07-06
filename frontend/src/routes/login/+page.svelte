<script lang="ts">
	import { resolve } from '$app/paths';

	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let email = $state('');
	let password = $state('');

	function handleLogin() {
		console.log('Email:', email);
		console.log('Password:', password);
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-surface">
	<Card>
		<h1 class="text-lg font-bold text-primary-dark mb-4 text-center">Tabulampot</h1>

		<Input label="Email" type="email" placeholder="nama@email.com" bind:value={email} />
		<Input label="Password" type="password" placeholder="••••••••" bind:value={password} />

		<Button variant="primary" onclick={handleLogin} >Masuk</Button>

		<p class="text-xs text-center text-gray-500 mt-3">
			belum punya akun? <a href={resolve('/register')} class="text-primary">Daftar</a>

		</p>
	</Card>
</div>