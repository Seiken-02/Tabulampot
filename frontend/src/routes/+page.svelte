<script lang="ts">
	import { resolve } from '$app/paths';
	import LandingNavbar from '$lib/components/layout/LandingNavbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<LandingNavbar />

<!-- ============ HERO ============ -->
<section class="max-w-5xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
	<div>
		<Badge text="Untuk pekebun rumahan" />

		<h1 class="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
			Rawat tanaman buah dalam pot, tanpa tebak-tebakan.
		</h1>

		<p class="text-gray-500 mt-4 text-base leading-relaxed max-w-md">
			Catat umur, jadwal siram dan pemupukan setiap tabulampotmu.
			Nggak perlu lagi nebak kapan terakhir kali disiram.
		</p>

		<div class="flex flex-wrap gap-3 mt-8">
			<a href={resolve('/register')}>
				<Button variant="primary">Mulai Sekarang</Button>
			</a>
			<a href={resolve('/login')}>
				<Button variant="secondary">Sudah Punya Akun</Button>
			</a>
		</div>
	</div>
</section>

<Footer />