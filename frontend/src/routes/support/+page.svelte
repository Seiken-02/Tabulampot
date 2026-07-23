<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	interface UpdateItem {
		icon: string;
		title: string;
		description: string;
	}

	const updates: UpdateItem[] = [
		{
			icon: '🔔',
			title: 'Notifikasi Push',
			description: 'Pengingat siram dan pupuk langsung ke HP, nggak perlu buka app terus-terusan.'
		},
		{
			icon: '📊',
			title: 'Grafik Pertumbuhan',
			description: 'Visualisasi perkembangan tiap tanaman dari waktu ke waktu.'
		},
		{
			icon: '🌦️',
			title: 'Integrasi Cuaca Lokal',
			description: 'Jadwal siram otomatis nyesuain sama prediksi cuaca di lokasi kamu.'
		}
	];

	interface Milestone {
		icon: string;
		title: string;
		description: string;
		current: number;
		target: number;
	}

	const milestones: Milestone[] = [
		{
			icon: '🌾',
			title: 'Rekomendasi Jenis Pupuk',
			description:
				'Sistem bakal ngasih rekomendasi pupuk yang sesuai berdasarkan jenis tanaman, umur, dan kondisi pertumbuhannya jadi nggak asal kasih pupuk.',
			current: 75000,
			target: 100000
		},
		{
			icon: '📡',
			title: 'Pemantauan via IoT',
			description:
				'sambungkan dengan sensor kelembaban dan suhu tanah yang datanya bisa dipantau langsung lewat web, jadi tahu kondisi tabulampot real-time tanpa harus cek manual.',
			current: 12000,
			target: 80000
		}
	];

	function formatRupiah(value: number): string {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(value);
	}

	function progressPercent(current: number, target: number): number {
		if (target <= 0) return 0;
		return Math.min(100, Math.round((current / target) * 100));
	}

	interface DonationLink {
		icon: string;
		iconImg?: string;
		name: string;
		description: string;
		href: string;
	}

	const donationLinks: DonationLink[] = [
		{
			icon: '☕',
			iconImg: '/icons/saweria.svg',
			name: 'Saweria',
			description: 'Traktir kopi buat developer',
			href: 'https://saweria.co/tabulampot'
		},
		{
			icon: '🎁',
			iconImg: '/icons/trakteer.svg',
			name: 'Trakteer',
			description: 'Dukung lewat Trakteer',
			href: 'https://trakteer.id/tabulampot'
		},
		{
			icon: '💙',
			iconImg: '/icons/kofi.png',
			name: 'Ko-fi',
			description: 'Support internasional via Ko-fi',
			href: 'https://ko-fi.com/tabulampot'
		}
	];
</script>

<Navbar />

<section class="page">
	<span class="eyebrow">Support</span>
	<h1 class="title">Bantu Tabulampot Berkembang</h1>
	<p class="subtitle">Rencana ke depan, kesempatan kolaborasi, dan cara mendukung project ini.</p>

	<!-- Update Mendatang -->
	<div class="block">
		<h2 class="block-title">Update Mendatang</h2>
		<div class="update-grid">
			{#each updates as item (item.title)}
				<Card>
					<div class="update-item">
						<span class="icon-badge">{item.icon}</span>
						<h3 class="item-title">{item.title}</h3>
						<p class="item-desc">{item.description}</p>
					</div>
				</Card>
			{/each}
		</div>
	</div>

	<!-- Milestones -->
	<div class="block">
		<h2 class="block-title">Milestone</h2>
		<div class="milestone-list">
			{#each milestones as item (item.title)}
				<Card>
					<div class="milestone-item">
						<span class="icon-badge">{item.icon}</span>
						<div class="milestone-content">
							<h3 class="item-title">{item.title}</h3>
							<p class="item-desc">{item.description}</p>

							<div class="progress-wrapper">
								<div class="progress-track">
									<div
										class="progress-fill"
										style="width: {progressPercent(item.current, item.target)}%"
									></div>
								</div>
								<div class="progress-meta">
									<span class="progress-amount">
										{formatRupiah(item.current)} <span class="progress-of">dari</span>
										{formatRupiah(item.target)}
									</span>
									<span class="progress-percent"
										>{progressPercent(item.current, item.target)}%</span
									>
								</div>
							</div>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</div>

	<!-- Open for Collaboration -->
	<div class="block">
		<Card>
			<div class="collab-item">
				<span class="icon-badge">🤝</span>
				<h2 class="item-title">Open for Collaboration</h2>
				<p class="item-desc">
					Tabulampot terbuka buat siapa pun yang mau ikut bantu ngembangin — baik dari sisi
					desain, coding, riset pupuk, sampai hardware IoT. Kalau kamu tertarik kontribusi atau
					sekadar mau diskusi ide, langsung aja hubungi kami lewat halaman
					<a href="/tentang" class="inline-link">Tentang</a>.
				</p>
			</div>
		</Card>
	</div>

	<!-- Dukung Project -->
	<div class="block">
		<h2 class="block-title">Dukung Project Ini</h2>
		<p class="block-subtitle">
			Tabulampot dikembangkan secara mandiri. Kalau app ini membantu, kamu bisa<br>
            bantu balik lewat salah satu platform berikut.
		</p>
		<div class="donation-list">
			{#each donationLinks as item (item.name)}
				<a href={item.href} class="donation-link" target="_blank" rel="noopener noreferrer">
					<Card>
						<div class="donation-item">
							<span class="icon-badge">
								{#if item.iconImg}
									<img src={item.iconImg} alt={item.name} class="icon-img" />
								{:else}
									{item.icon}
								{/if}
							</span>
							<div class="donation-text">
								<span class="donation-name">{item.name}</span>
								<span class="donation-desc">{item.description}</span>
							</div>
							<span class="arrow">→</span>
						</div>
					</Card>
				</a>
			{/each}
		</div>
	</div>
</section>

<Footer />

<style>
	.page {
		max-width: 48rem;
		margin: 0 auto;
		padding: 4rem 1.5rem 6rem;
	}

	.eyebrow {
		display: block;
		text-align: center;
		font-size:2.0rem;
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
		margin-bottom: 3rem;
	}

	.block {
		margin-bottom: 3rem;
	}

	.block:last-child {
		margin-bottom: 0;
	}

	.block-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-primary-dark);
		margin-bottom: 0.375rem;
        text-align:  center;
	}

	.block-subtitle {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin-bottom: 1.25rem;
		line-height: 1.6;
        text-align: center;
	}

	/* ===== Update Mendatang ===== */
	.update-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-top: 1.25rem;
	}

	.update-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	@media (min-width: 640px) {
		.update-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* ===== Milestone ===== */
	.milestone-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1.25rem;
	}

	.milestone-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.milestone-item .icon-badge {
		margin-bottom: 0;
	}

	.milestone-content {
		flex: 1;
		min-width: 0;
	}

	.progress-wrapper {
		margin-top: 1rem;
	}

	.progress-track {
		width: 100%;
		height: 0.5rem;
		border-radius: 9999px;
		background-color: var(--color-primary-light);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: 9999px;
		background-color: var(--color-primary);
		transition: width 0.4s ease;
	}

	.progress-meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.progress-amount {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.progress-of {
		font-weight: 400;
		color: var(--color-text-muted);
	}

	.progress-percent {
		flex-shrink: 0;
		font-size: 0.8125rem;
		font-weight: 700;
		color: var(--color-primary-dark);
	}

	/* ===== Collaboration ===== */
	.collab-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.collab-item .item-title {
		font-size: 1.0625rem;
	}

	.inline-link {
		color: var(--color-primary);
		font-weight: 600;
		text-decoration: underline;
	}

	/* ===== Donasi ===== */
	.donation-list {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.donation-link {
		text-decoration: none;
		color: inherit;
	}

	.donation-link :global(.card) {
		transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
	}

	.donation-link:hover :global(.card) {
		transform: translateY(-3px);
		border-color: var(--color-primary);
		box-shadow: 0 10px 20px -8px color-mix(in srgb, var(--color-primary) 25%, transparent);
	}

	.donation-item {
		display: flex;
		align-items: center;
		gap: 0.875rem;
	}

	.donation-text {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.donation-name {
		font-size: 0.9375rem;
		font-weight: 700;
		color: var(--color-primary-dark);
	}

	.donation-desc {
		font-size: 0.8125rem;
		color: var(--color-text-muted);
	}

	.arrow {
		color: var(--color-text-muted);
		font-size: 1.125rem;
		transition: transform 0.25s ease;
	}

	.donation-link:hover .arrow {
		transform: translateX(3px);
		color: var(--color-primary);
	}

	/* ===== Shared ===== */
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
		overflow: hidden;
	}

	.icon-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 0.375rem;
		box-sizing: border-box;
	}

	.donation-item .icon-badge {
		margin-bottom: 0;
		background-color: var(--color-white);
		border: 1px solid var(--color-border);
	}

	.item-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 0.5rem;
	}

	.item-desc {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (prefers-reduced-motion: reduce) {
		.donation-link :global(.card),
		.arrow {
			transition: none;
		}
	}
</style>