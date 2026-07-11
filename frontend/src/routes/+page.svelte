<script lang="ts">
	import { resolve } from '$app/paths';
	import LandingNavbar from '$lib/components/layout/LandingNavbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<LandingNavbar />

<!-- ============ HERO ============ -->
<section class="hero">
	<div>
		<Badge text="Untuk pekebun rumahan" />

		<h1 class="headline">
			Rawat tanaman buah dalam pot, tanpa tebak-tebakan.
		</h1>

		<p class="subtext">
			Catat umur, jadwal siram dan pemupukan setiap tabulampotmu.
			Nggak perlu lagi nebak kapan terakhir kali disiram.
		</p>

		<div class="cta-group">
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

<style>
	.hero {
		max-width: 64rem;
		margin: 0 auto;
		padding: 4rem 1.5rem 6rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;
	}

	.headline {
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--color-text);
		margin-top: 1rem;
		line-height: 1.2;
	}

	.subtext {
		color: var(--color-text-muted);
		margin-top: 1rem;
		font-size: 1rem;
		line-height: 1.625;
		max-width: 28rem;
	}

	.cta-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	/* Setara md: breakpoint Tailwind (768px) */
	@media (min-width: 768px) {
		.hero {
			grid-template-columns: 1fr 1fr;
		}

		.headline {
			font-size: 3rem;
		}
	}
</style>