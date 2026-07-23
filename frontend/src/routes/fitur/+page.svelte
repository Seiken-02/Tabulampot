<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface FeatureItem {
		icon: string;
		title: string;
		description: string;
	}

	const features: FeatureItem[] = [
		{
			icon: '💧',
			title: 'Jadwal Siram Otomatis',
			description:
				'Setiap jenis tanaman punya interval siram default. Tabulampot otomatis ngitung kapan tanamanmu perlu disiram lagi, dan kamu tinggal tap tombol Siram tiap kali sudah nyiram.'
		},
		{
			icon: '🌿',
			title: 'Koleksi Tanaman Tanpa Batas',
			description:
				'Tambahin sebanyak apa pun tanaman, masing-masing dengan jenis, tanggal tanam, dan lokasi sendiri-sendiri.'
		},
		{
			icon: '📅',
			title: 'Riwayat Perawatan Lengkap',
			description:
				'Tiap tanaman punya halaman detail dengan kalender yang nunjukin tanggal siram, pupuk, dan tanggal tanam — semua kelihatan dalam satu tampilan.'
		},
		{
			icon: '📱',
			title: 'Akses di Mana Saja',
			description:
				'Tabulampot berjalan di browser dan responsif di semua ukuran layar, jadi bisa dibuka langsung dimana saja.'
		}
	];

	interface FaqItem {
		icon: string;
		question: string;
		answer: string;
	}

	const faqs: FaqItem[] = [
		{
			icon: '💧',
			question: 'Bagaimana cara tahu pupuk yang cocok?',
			answer:
				'saat ini Tabulampot belum bisa menyediakan data pupuk untuk tanaman, support terus untuk update selanjutnya .'
		},
		{
			icon: '🌿',
			question: 'Tanaman apa saja yang tersedia?',
			answer:
				'Tabulampot menyediakan jadwal tanaman yang umum di tanam dalam pot di indonesia, jenis tanaman akan kami update berkala.'
		},
		{
			icon: '📱',
			question: 'Bisakah digunakan memantau tanaman via online?',
			answer:
				'saat ini Tabulampot belum memiliki fitur tersebut, tapi developer berencana menambahkan fitur serupa dimasa depan, support terus untuk update selanjutnya'
		}
	];

	let openIndex = $state<number | null>(null);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<Navbar />

<section class="page">
	<span class="eyebrow">Fitur</span>
	<h1 class="title">Semua yang kamu butuhkan buat rawat tabulampot</h1>
	<p class="subtitle">Dari jadwal siram sampai riwayat pertumbuhan, dalam satu tempat.</p>

	<div class="card-grid">
		{#each features as item (item.title)}
			<Card>
				<div class="feature-content">
					<span class="icon-badge">{item.icon}</span>
					<h3 class="feature-title">{item.title}</h3>
					<p class="feature-desc">{item.description}</p>
				</div>
			</Card>
		{/each}
	</div>
</section>

<section class="page faq-section">
	<span class="eyebrow">FAQ</span>
	<h2 class="title"> Frequently Asked Questions</h2>
	<p class="subtitle">Beberapa hal yang paling sering ditanyain soal Tabulampot.</p>

	<div class="accordion-list">
		{#each faqs as item, i (item.question)}
			<div class="accordion-item" class:open={openIndex === i}>
				<button class="accordion-header" onclick={() => toggle(i)}>
					<span class="icon-badge">{item.icon}</span>
					<span class="question">{item.question}</span>
					<span class="toggle-icon" class:open={openIndex === i}>+</span>
				</button>

				{#if openIndex === i}
					<div class="answer-wrapper" transition:slide={{ duration: 280, easing: quintOut }}>
						<p class="answer" transition:fade={{ duration: 200, delay: 80 }}>
							{item.answer}
						</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<Footer />

<style>
	.page {
		max-width: 64rem;
		margin: 0 auto;
		padding: 4rem 1.5rem 6rem;
	}

	.faq-section {
		max-width: 40rem;
		padding-top: 0;
	}

	.eyebrow {
		display: block;
		text-align: center;
		font-size: 2.0rem;
		font-weight: 700;
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

	/* ===== Fitur: card grid ===== */
	.card-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.card-grid :global(.card) {
		padding: 1.5rem;
		transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
	}

	.card-grid :global(.card:hover) {
		transform: translateY(-4px);
		border-color: var(--color-primary);
		box-shadow: 0 12px 24px -8px color-mix(in srgb, var(--color-primary) 25%, transparent);
	}

	.feature-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.feature-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 0.5rem;
	}

	.feature-desc {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.card-grid :global.card:hover .icon-badge {
		background-color: var(--color-accent-light);
		transform: scale(1.08);
	}

	@media (min-width: 640px) {
		.card-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}


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
		transition: background-color 0.25s ease, transform 0.25s ease;
	}

	/* ===== FAQ: accordion ===== */
	.accordion-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.accordion-item {
		background-color: var(--color-white);
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: 1rem 1.25rem;
		transition: border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
	}

	.accordion-item.open {
		border-color: var(--color-primary);
		background-color: var(--color-primary-light);
		box-shadow: 0 4px 16px -4px color-mix(in srgb, var(--color-primary) 25%, transparent);
	}

	.accordion-header {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.875rem;
		background: none;
		border: none;
		text-align: left;
		padding: 0;
	}

	.accordion-item .icon-badge {
		width: 2.25rem;
		height: 2.25rem;
		font-size: 1.125rem;
		margin-bottom: 0;
	}

	.accordion-item.open .icon-badge {
		background-color: var(--color-accent-light);
		transform: scale(1.05);
	}

	.question {
		flex: 1;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-text);
		transition: color 0.25s ease;
	}

	.accordion-item.open .question {
		color: var(--color-primary-dark);
	}

	.toggle-icon {
		flex-shrink: 0;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 9999px;
		background-color: var(--color-primary-light);
		color: var(--color-primary-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.125rem;
		font-weight: 700;
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.25s ease, color 0.25s ease;
	}

	.toggle-icon.open {
		transform: rotate(135deg);
		background-color: var(--color-primary);
		color: var(--color-white);
	}

	.answer-wrapper {
		overflow: hidden;
	}

	.answer {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		margin-top: 0.875rem;
		padding-top: 0.875rem;
		padding-left: calc(2.25rem + 0.875rem);
		border-top: 1px solid color-mix(in srgb, var(--color-primary) 15%, transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.card-grid :global(.card),
		.icon-badge {
			transition: none;
		}
	}
</style>
