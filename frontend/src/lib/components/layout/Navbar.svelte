<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface NavItem {
		label: string;
		href: '/dashboard' | '/plants' | '/tentang' | '/fitur' | '/support';
	}

	const navItems: NavItem[] = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Tanaman', href: '/plants' },
		{ label: 'Fitur', href: '/fitur' },
		{ label: 'Tentang', href: '/tentang' },
		{ label: 'Support', href: '/support' }
	];

	// TODO: sesuaikan sumber data user ini dengan auth-mu yang sebenarnya.
	// Asumsi: +layout.server.ts (atau hooks) taruh user login ke `data.user`,
	// jadi otomatis nyambung ke page.data lewat load function.
	const user = $derived(page.data.user as { name: string; email: string } | undefined);

	let isMenuOpen = $state(false);
	let isProfileOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function toggleProfile() {
		isProfileOpen = !isProfileOpen;
	}

	function handleLogout() {
		console.log('Logout');
		isProfileOpen = false;
		goto(resolve('/login'));
	}
</script>

<nav class="navbar">
	<!-- Wrapper utama -->
	<div class="nav-inner">
		<!-- Logo -->
		<span class="brand">Tabulampot</span>

		<!-- Navigasi -->
		<div class="nav-links">
			{#each navItems as item (item.href)}
				<a
					href={resolve(item.href)}
					class="nav-link"
					class:active={page.url.pathname === item.href}
				>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- Grup tombol Profile & Menu (hamburger) -->
		<div class="actions">
			<!-- Tombol Profile (avatar) -->
			<button onclick={toggleProfile} class="profile-btn" aria-label="Profil">
				👤
			</button>

			<!-- Dropdown profile -->
			{#if isProfileOpen}
				<div transition:slide={{ duration: 200, easing: quintOut }} class="profile-dropdown">
					<div class="profile-header">
						<p class="profile-name">{user?.name ?? 'Pengguna'}</p>
						<p class="profile-email">{user?.email ?? ''}</p>
					</div>
					<button onclick={handleLogout} class="logout-btn">
						Keluar
					</button>
				</div>
			{/if}

			<!-- Tombol Menu mobile (hamburger) -->
			<button onclick={toggleMenu} class="menu-btn" aria-label="Menu">
				<div class="hamburger">
					<span class="bar" class:open-top={isMenuOpen}></span>
					<span class="bar" class:open-mid={isMenuOpen}></span>
					<span class="bar" class:open-bottom={isMenuOpen}></span>
				</div>
				<span>Menu</span>
			</button>
		</div>
	</div>

	<!-- Dropdown menu navigasi mobile -->
	{#if isMenuOpen}
		<div transition:slide={{ duration: 250, easing: quintOut }} class="mobile-menu">
			{#each navItems as item (item.href)}
				<a
					href={resolve(item.href)}
					onclick={() => (isMenuOpen = false)}
					class="mobile-link"
					class:active={page.url.pathname === item.href}
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.navbar {
		background-color: var(--color-white);
		border-bottom: 1px solid var(--color-border);
		padding: 0.75rem 1rem 0.75rem 1.5rem;
		position: relative;
	}

	.nav-inner {
		display: flex;
		align-items: center;
		position: relative;
	}

	.brand {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-primary-dark);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.nav-links {
		display: none;
	}

	.nav-link {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-muted);
		transition: color 0.2s ease;
		white-space: nowrap;
	}

	.nav-link:hover {
		color: var(--color-primary);
	}

	.nav-link.active {
		color: var(--color-primary);
	}

	.actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		position: relative;
	}

	/* Mobile: menu di kiri, profile di kanan */
	.menu-btn {
		order: 1;
	}
	.profile-btn {
		order: 2;
	}

	.profile-btn {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 9999px;
		background-color: var(--color-primary-light);
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		transition: background-color 0.2s ease;
	}

	.profile-btn:hover {
		background-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.profile-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		width: 12rem;
		background-color: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
		overflow: hidden;
		z-index: 20;
	}

	.profile-header {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--color-surface-muted);
	}

	.profile-name {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text);
	}

	.profile-email {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.logout-btn {
		width: 100%;
		text-align: left;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		color: var(--color-danger-dark);
		background: none;
		border: none;
	}

	.logout-btn:hover {
		background-color: var(--color-danger-light);
	}

	.menu-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-primary-dark);
		background-color: var(--color-primary-light);
		border: none;
		padding: 0.375rem 0.75rem;
		border-radius: 9999px;
		transition: transform 0.15s ease;
	}

	.menu-btn:active {
		transform: scale(0.95);
	}

	.hamburger {
		position: relative;
		width: 1rem;
		height: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bar {
		position: absolute;
		width: 1rem;
		height: 2px;
		background-color: var(--color-primary-dark);
		border-radius: 9999px;
		transition: all 0.3s ease;
	}

	.bar:nth-child(1) {
		transform: translateY(-6px);
	}
	.bar:nth-child(1).open-top {
		transform: rotate(45deg);
	}

	.bar:nth-child(2).open-mid {
		opacity: 0;
	}

	.bar:nth-child(3) {
		transform: translateY(6px);
	}
	.bar:nth-child(3).open-bottom {
		transform: rotate(-45deg);
	}

	.mobile-menu {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		background-color: var(--color-white);
		border-bottom: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem;
		z-index: 10;
		overflow: hidden;
	}

	.mobile-link {
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.5rem;
		border-radius: var(--radius-md);
		color: var(--color-text-muted);
		transition: background-color 0.2s ease, color 0.2s ease;
	}

	.mobile-link:hover {
		background-color: var(--color-surface-muted);
	}

	.mobile-link.active {
		color: var(--color-primary);
		background-color: var(--color-primary-light);
	}

	@media (min-width: 768px) {
	.nav-inner {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 1rem;
	}

	.brand {
		position: static;
		transform: none;
		justify-self: start;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		justify-self: center;
		white-space: nowrap;
	}

	.actions {
		width: auto;
		justify-self: end;
	}

	.menu-btn {
		display: none;
		order: 2;
	}

	.profile-btn {
		order: 1;
	}

	.mobile-menu {
		display: none;
	}
}
</style>