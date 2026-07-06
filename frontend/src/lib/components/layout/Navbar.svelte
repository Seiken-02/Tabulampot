<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	interface NavItem {
		label: string;
		href: '/dashboard' ;
	}

	const navItems: NavItem[] = [
		{ label: 'Dashboard', href: '/dashboard' },

	];
</script>
<nav class="bg-white border-b border-gray-200 px-6 py-3 grid grid-cols-3 items-center">
	<span class="text-lg font-bold text-primary-dark justify-self-start">🌱 Tabulampot</span>

	<div class="flex items-center gap-6 justify-self-center">
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

	<div class="flex items-center gap-4 justify-self-end">
		<div class="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-sm">
			👤
		</div>
	</div>
</nav>