import type { PageServerLoad } from './$types';

// TODO: ganti dengan query asli ke activity_logs, plant_types, dan API cuaca
export const load: PageServerLoad = async () => {
	return {
		userName: 'Andreas',
		cuaca: { suhu: 29, kondisi: 'Cerah Berawan', icon: '⛅' },
		tanggalSiram: [3, 5, 10, 12, 18, 22],
		tanggalPupuk: [7, 12, 20, 28],
		tanggalHujan: [5, 18],
		aktivitasTerbaru: [
			{ id: 1, name: 'Jeruk Nipis', type: 'siram', status: 'Mendesak' },
			{ id: 2, name: 'Mangga Harum', type: 'siram', status: 'Selesai' },
			{ id: 3, name: 'Jambu Kristal', type: 'pupuk', status: 'Selesai' }
		]
	};
};