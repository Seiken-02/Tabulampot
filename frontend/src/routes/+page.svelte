<script lang="ts">
	import Input from '$lib/components/ui/Input.svelte';

	let email = $state('');
</script>

<Input label="Email" type="email" placeholder="nama@email.com" bind:value={email} />

<p>Kamu ngetik: {email}</p>