<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	const userName = 'Andreas';
	const cuaca = { suhu: 29, kondisi: 'Cerah Berawan', icon: '⛅' };

	const today = new Date();
	const hariIni = today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
	const namaBulan = today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

	// Dummy - nanti dihitung dari activity_logs & interval plant_types
	const tanggalSiram = [3, 5, 10, 12, 18, 22];
	const tanggalPupuk = [7, 12, 20, 28];

	// Dummy - nanti diganti hasil fetch API cuaca
	const tanggalHujan = [5, 18];

	const year = today.getFullYear();
	const month = today.getMonth();
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const calendarDays = $derived.by(() => {
		const days: (number | null)[] = [];
		for (let i = 0; i < firstDay; i++) days.push(null);
		for (let d = 1; d <= daysInMonth; d++) days.push(d);
		return days;
	});

	function isHujan(day: number) {
		return tanggalHujan.includes(day);
	}
	function showSiram(day: number) {
		return tanggalSiram.includes(day) && !isHujan(day);
	}
	function showPupuk(day: number) {
		return tanggalPupuk.includes(day);
	}

	const aktivitasTerbaru = [
		{ id: 1, name: 'Jeruk Nipis', type: 'siram' as const,  status: 'Mendesak' },
		{ id: 2, name: 'Mangga Harum', type: 'siram' as const,  status: 'Selesai' },
		{ id: 3, name: 'Jambu Kristal', type: 'pupuk' as const,  status: 'Selesai' }
	];
</script>

<Navbar  />

<div class="p-4 max-w-md mx-auto">

	<div class="mb-4">
		<p class="text-lg font-bold text-primary-dark">Halo, {userName} 👋</p>
		<p class="text-xs text-gray-500 capitalize">{hariIni}</p>
	</div>

	<Card>
		<div class="flex items-center gap-3">
			<span class="text-3xl">{cuaca.icon}</span>
			<div>
				<p class="text-lg font-bold">{cuaca.suhu}°C</p>
				<p class="text-xs text-gray-500">{cuaca.kondisi}</p>
			</div>
		</div>
	</Card>

	<h2 class="text-sm font-semibold text-gray-700 capitalize mt-6 mb-2">{namaBulan}</h2>
	<Card>
		<div class="grid grid-cols-7 gap-y-2 text-center text-xs text-gray-400 mb-1">
			<span>M</span><span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span>
		</div>
		<div class="grid grid-cols-7 gap-y-2 text-center text-sm">
			{#each calendarDays as day, i (i)}
				{#if day === null}
					<div></div>
				{:else}
					<div class="flex flex-col items-center gap-1">
						<span class="w-7 h-7 flex items-center justify-center rounded-full {day === today.getDate() ? 'bg-primary text-white font-medium' : ''}">
							{day}
						</span>
						<div class="flex items-center gap-0.5 h-2">
							{#if showSiram(day)}
								<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
							{/if}
							{#if showPupuk(day)}
								<span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
							{/if}
							{#if isHujan(day)}
								<span class="text-[9px] leading-none">🌧️</span>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-500">
			<span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Perlu disiram</span>
			<span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-accent"></span> Perlu dipupuk</span>
			<span class="flex items-center gap-1">🌧️ Hujan (siram di-skip)</span>
		</div>
	</Card>

	<div class="flex items-center justify-between mt-6 mb-2">
		<h2 class="text-sm font-semibold text-gray-700">Aktivitas Terbaru</h2>
		<span class="text-[10px] text-gray-400">Update tiap hari</span>
	</div>

	<div class="flex flex-col gap-3">
		{#each aktivitasTerbaru as item (item.id)}
			<Card>
				<div class="flex items-center gap-3">
					<span class="w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0 {item.type === 'siram' ? 'bg-primary-light' : 'bg-accent-soft'}">
						{item.type === 'siram' ? '💧' : '🌱'}
					</span>
					<div class="flex-1 min-w-0">
						<p class="font-medium text-sm truncate">{item.name}</p>

					</div>
					<Badge 
						text={item.status} 
						variant={item.status === 'Mendesak' ? 'danger' : 'success'} 
					/>
				</div>
			</Card>
		{/each}
	</div>

</div>