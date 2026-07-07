<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer class="border-t border-gray-100 mt-12">
	<div class="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
		<div class="flex items-center gap-2">
			<span class="font-bold text-primary-dark">Tabulampot</span>
		</div>

		<div class="flex items-center gap-6 text-sm text-gray-500">
			<a href={resolve('/login')} class="hover:text-primary">Masuk</a>
			<a href={resolve('/register')} class="hover:text-primary">Daftar</a>
		</div>

		<p class="text-xs text-gray-400">
			© 2026 Tabulampot
		</p>
	</div>
</footer>