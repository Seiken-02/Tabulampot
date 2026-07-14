<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	interface ContactItem {
		icon: string;
		iconImg?: string;
		label: string;
		value: string;
		href: string;
	}

	const contacts: ContactItem[] = [
		{
			icon: '',
			iconImg: '/icons/email.png',
			label: 'Gmail',
			value: '@tabulampot.app',
			href: 'mailto:hello@tabulampot.app'
		},
		{
			icon: '',
			iconImg: '/icons/instagram.png',
			label: 'Instagram',
			value: '@tabulampot.app',
			href: 'https://instagram.com/tabulampot.app'
		}
	];
</script>

<Navbar />

<section class="page">
	<span class="eyebrow">Tentang</span>
	<h1 class="title">Tabulampot lahir dari kebun kecil di rumah</h1>
	<p class="subtitle">Cerita di balik aplikasi ini, dan kenapa kami bikinnya.</p>

	<Card>
		<div class="story">
			<p>
				Tabulampot dimulai dari masalah sederhana: tanaman buah dalam pot sering lupa disiram
				karena jadwalnya beda-beda tiap jenis, dan gampang banget kelewat kalau cuma diinget-inget
				di kepala.
			</p>
			<p>
				Dari situ, kami bikin cara yang lebih gampang buat ngurus tabulampot mulai dari jadwal
				siram otomatis, sampai riwayat perawatan yang tercatat rapi, jadi pekebun rumahan nggak
				perlu pusing ngatur semuanya manual.
			</p>
		</div>
	</Card>

	<div class="mission-grid">
		<Card>
			<div class="mission-item">
				<span class="icon-badge">🌱</span>
				<h3 class="mission-title">Misi Kami</h3>
				<p class="mission-desc">
					Bikin siapa pun bisa rawat tabulampot dengan santai, tanpa perlu jadi ahli berkebun dulu.
				</p>
			</div>
		</Card>

		<Card>
			<div class="mission-item">
				<span class="icon-badge">🏡</span>
				<h3 class="mission-title">Buat Pekebun Rumahan</h3>
				<p class="mission-desc">
					Dirancang khusus buat kebutuhan sehari-hari di rumah, bukan buat kebun skala besar.
				</p>
			</div>
		</Card>
	</div>
</section>

<section class="page contact-section">
	<span class="eyebrow">Hubungi Kami</span>
	<h2 class="title">Ada pertanyaan atau saran?</h2>
	<p class="subtitle">Detail lebih lanjut bisa langsung ditanyakan lewat kontak berikut.</p>

	<div class="contact-list">
		{#each contacts as item (item.label)}
			<a href={item.href} class="contact-link" target="_blank" rel="noopener noreferrer">
				<Card>
					<div class="contact-item">
						<span class="icon-badge">
							{#if item.iconImg}
								<img src={item.iconImg} alt={item.label} class="icon-img" />
							{:else}
								{item.icon}
							{/if}
						</span>
						<div class="contact-text">
							<span class="contact-label">{item.label}</span>
							<span class="contact-value">{item.value}</span>
						</div>
					</div>
				</Card>
			</a>
		{/each}
	</div>
</section>

<Footer />

<style>
	.page {
		max-width: 40rem;
		margin: 0 auto;
		padding: 4rem 1.5rem 2rem;
	}

	.contact-section {
		padding-top: 0;
		padding-bottom: 6rem;
	}

	.eyebrow {
		display: block;
		text-align: center;
		font-size: 2.0rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: 0.75rem;
	}

	.title {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--color-primary-dark);
		text-align: center;
		line-height: 1.3;
	}

	.subtitle {
		font-size: 0.9375rem;
		color: var(--color-text-muted);
		text-align: center;
		margin-top: 0.5rem;
		margin-bottom: 2.5rem;
	}

	/* ===== Cerita ===== */
	.story {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.story p {
		font-size: 0.9375rem;
		color: var(--color-text);
		line-height: 1.7;
	}

	/* ===== Misi ===== */
	.mission-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-top: 1.25rem;
	}

	.mission-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.mission-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 0.5rem;
	}

	.mission-desc {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 640px) {
		.mission-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* ===== Kontak ===== */
	.contact-list {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.contact-link {
		text-decoration: none;
		color: inherit;
	}

	.contact-link :global(.card) {
		transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
	}

	.contact-link:hover :global(.card) {
		transform: translateY(-3px);
		border-color: var(--color-primary);
		box-shadow: 0 10px 20px -8px color-mix(in srgb, var(--color-primary) 25%, transparent);
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.875rem;
	}

	.contact-text {
		display: flex;
		flex-direction: column;
	}

	.contact-label {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.contact-value {
		font-size: 0.9375rem;
		font-weight: 700;
		color: var(--color-primary-dark);
	}

	/* ===== Shared icon badge ===== */
	.icon-badge {
		flex-shrink: 0;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: var(--radius-md);
		background-color: var(--color-accent-soft);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.375rem;
		margin-bottom: 1rem;
	}

	.contact-item .icon-badge {
		margin-bottom: 0;
	}

	.icon-img {
		width: 1.75rem;
		height: 1.75rem;
		object-fit: contain;
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-link :global(.card) {
			transition: none;
		}
	}
</style>