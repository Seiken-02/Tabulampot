<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	// Data contoh (dummy) — cuma buat nguji tampilan dulu
	const plant = {
		id: '1',
		name: 'Mangga Harum',
		planted_at: '2026-06-03',
		status: 'Sehat',
		history: [
			{ id: 1, type: 'siram' as const, date: '2026-06-10' },
			{ id: 2, type: 'pupuk' as const, date: '2026-06-15' },
			{ id: 3, type: 'siram' as const, date: '2026-06-20' },
			{ id: 4, type: 'siram' as const, date: '2026-06-27' }
		]
	};

	// Kalender statis: langsung hardcode buat bulan Juni 2026 (30 hari, tanggal 1 jatuh di hari Senin)
	// null = slot kosong sebelum tanggal 1
	const namaBulan = 'Juni 2026';
	const days: (number | null)[] = [null, 1, 2, 3, 4, 5, 6, ...Array.from({ length: 24 }, (_, i) => i + 7)];

	// Ditentukan manual, bukan dihitung dari Date — cuma buat nguji tampilan
	const plantedDay = 3;
	const todayDay = 20;

	// Set siram & pupuk diambil langsung dari tanggal di history (tetap dinamis dari data,
	// tapi tidak lagi bergantung ke bulan yang sedang dilihat karena bulannya statis)
	const siramDays = new Set(
		plant.history.filter((h) => h.type === 'siram').map((h) => new Date(h.date).getDate())
	);
	const pupukDays = new Set(
		plant.history.filter((h) => h.type === 'pupuk').map((h) => new Date(h.date).getDate())
	);

	// Format tanggal ISO ("2026-06-03") jadi format Indonesia ("3 Juni 2026")
	function formatTanggal(iso: string): string {
		return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
	}

	function handleSiram() {
		console.log('Siram tanaman', plant.id);
	}

	function handlePupuk() {
		console.log('Pupuk tanaman', plant.id);
	}
</script>

<Navbar />

<div class="p-4 max-w-md mx-auto">
	<!-- Kartu info tanaman: nama, tanggal tanam, status, dan tombol aksi -->
	<Card>
		<div class="flex items-center gap-3 mb-4">
			<div class="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-xl">
				🌿
			</div>
			<div class="flex-1">
				<p class="font-bold">{plant.name}</p>
				<p class="text-xs text-gray-500">Ditanam {formatTanggal(plant.planted_at)}</p>
			</div>
			<Badge text={plant.status} variant={plant.status === 'Sehat' ? 'success' : 'danger'} />
		</div>

		<div class="grid grid-cols-2 gap-2">
			<Button variant="secondary" onclick={handleSiram} class="w-full flex items-center justify-center">
				💧 Siram
			</Button>
			<Button variant="primary" onclick={handlePupuk} class="w-full flex items-center justify-center">
				🌱 Pupuk
			</Button>
		</div>
	</Card>

	<!-- Judul bulan statis, tanpa tombol navigasi -->
	<div class="flex items-center justify-center mt-6 mb-2">
		<h2 class="text-sm font-semibold text-gray-700 capitalize">{namaBulan}</h2>
	</div>

	<!-- Grid kalender -->
	<Card>
		<div class="grid grid-cols-7 gap-y-2 text-center text-xs text-gray-400 mb-1">
			<span>M</span><span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span>
		</div>
		<div class="grid grid-cols-7 gap-y-2 text-center text-sm">
			{#each days as day, i (i)}
				{#if day === null}
					<!-- Slot kosong sebelum tanggal 1 -->
					<div></div>
				{:else}
					<div class="flex flex-col items-center gap-1">
						<span
							class="w-7 h-7 flex items-center justify-center rounded-full transition-colors
								{day === plantedDay ? 'bg-primary-dark text-white font-medium' : ''}
								{day === todayDay && day !== plantedDay ? 'ring-2 ring-primary text-primary font-medium' : ''}"
						>
							{day}
						</span>

						<!-- Titik penanda kecil di bawah angka: tanam / siram / pupuk -->
						<div class="flex items-center gap-0.5 h-2">
							{#if day === plantedDay}
								<span class="text-[9px] leading-none">🌱</span>
							{/if}
							{#if siramDays.has(day)}
								<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
							{/if}
							{#if pupukDays.has(day)}
								<span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Legenda arti simbol di kalender -->
		<div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-500">
			<span class="flex items-center gap-1">🌱 Tanggal tanam</span>
			<span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full border-2 border-primary"></span> Hari ini</span>
			<span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Disiram</span>
			<span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-accent"></span> Dipupuk</span>
		</div>
	</Card>
</div>