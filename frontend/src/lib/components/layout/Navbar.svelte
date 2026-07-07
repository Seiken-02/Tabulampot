<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface NavItem {
		label: string;
		href: '/dashboard' | '/plants';
	}

	const navItems: NavItem[] = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Tanaman', href: '/plants' }
	];

	
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

<nav class="bg-white border-b border-gray-200 pl-6 pr-4 py-3 relative">
	<!-- Wrapper utama-->
	<div class="flex items-center md:grid md:grid-cols-3 relative">

		<!-- Logo -->
		<span 
			class="text-lg font-bold text-primary-dark 
			md:justify-self-start 
			absolute left-1/2 -translate-x-1/2 
			md:static md:translate-x-0"
		>
			Tabulampot
		</span>

		<!-- Navigasi  -->
		<div class="hidden md:flex items-center gap-6 md:justify-self-center">
			{#each navItems as item (item.href)}
				<a
					href={resolve(item.href)}
					class="text-sm font-medium transition-colors {page.url.pathname === item.href
						? 'text-primary'
						: 'text-gray-500 hover:text-primary'}"
				>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- Grup tombol Profile & Menu (hamburger) -->
		<div class="flex items-center justify-between w-full md:w-auto md:justify-self-end relative">
			<!-- Tombol Profile (avatar) -->
			<button
				onclick={toggleProfile}
				class="order-2 md:order-1 w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-sm hover:bg-primary/20 transition-colors"
				aria-label="Profil"
			>
				👤
			</button>

			<!-- Dropdown profile-->
			{#if isProfileOpen}
				<div
					transition:slide={{ duration: 200, easing: quintOut }}
					class="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20"
				>
					<div class="px-4 py-3 border-b border-gray-100">
						<p class="text-sm font-medium text-gray-800">Andreas</p>
						<p class="text-xs text-gray-500">andreas@email.com</p>
					</div>
					<button
						onclick={handleLogout}
						class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
					>
						Keluar
					</button>
				</div>
			{/if}

			<!-- Tombol Menu mobile (hamburger)-->
			<button 
				onclick={toggleMenu} 
				class="order-1 md:order-2 md:hidden flex items-center gap-2 text-sm font-medium text-primary-dark bg-primary-light px-3 py-1.5 rounded-full transition-colors active:scale-95"
				aria-label="Menu"
			>
				<!-- Ikon hamburger yang animasi jadi silang (X) saat menu terbuka -->
				<div class="relative w-4 h-4 flex flex-col justify-center items-center">
					<span class="absolute w-4 h-0.5 bg-primary-dark rounded-full transition-all duration-300 {isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}"></span>
					<span class="absolute w-4 h-0.5 bg-primary-dark rounded-full transition-all duration-300 {isMenuOpen ? 'opacity-0' : 'opacity-100'}"></span>
					<span class="absolute w-4 h-0.5 bg-primary-dark rounded-full transition-all duration-300 {isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}"></span>
				</div>
				<span>Menu</span>
			</button>
		</div>
	</div>

	<!-- Dropdown menu navigasi mobile -->
	{#if isMenuOpen}
		<div 
			transition:slide={{ duration: 250, easing: quintOut }}
			class="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 flex flex-col gap-1 p-4 z-10 overflow-hidden"
		>
			{#each navItems as item (item.href)}
				<a
					href={resolve(item.href)}
					onclick={() => (isMenuOpen = false)}
					class="text-sm font-medium py-2 px-2 rounded-lg transition-colors {page.url.pathname === item.href
						? 'text-primary bg-primary-light'
						: 'text-gray-600 hover:bg-gray-50'}"
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>