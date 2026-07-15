<script lang="ts">
	import { onMount } from 'svelte';
	import { isLoggedIn, loadAuthFromStorage } from '$lib/stores/auth.svelte';

	let { children } = $props();
	let ready = $state(false);
	let authed = $state(false);

	onMount(() => {
		loadAuthFromStorage();
		authed = isLoggedIn();
		ready = true;
	});
</script>

{#if !ready}
	<!-- masih ngecek status login, jangan render apa-apa dulu -->
{:else if authed}
	{@render children()}
{:else}
	<div class="empty-state">
		<p>Silakan <a href="/login">login</a> dulu untuk melihat halaman ini.</p>
	</div>
{/if}

<style>
	.empty-state {
		min-height: 50vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: var(--color-text-muted);
		font-size: 0.9375rem;
	}

	.empty-state a {
		color: var(--color-primary);
		font-weight: 600;
	}
</style>