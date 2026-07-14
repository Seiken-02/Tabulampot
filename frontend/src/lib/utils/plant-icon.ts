const FRUIT_ICONS: { keyword: string; icon: string }[] = [
	{ keyword: 'mangga', icon: '🥭' },
	{ keyword: 'jeruk', icon: '🍊' },
	{ keyword: 'lemon', icon: '🍋' },
	{ keyword: 'apel', icon: '🍎' },
	{ keyword: 'pisang', icon: '🍌' },
	{ keyword: 'anggur', icon: '🍇' },
	{ keyword: 'semangka', icon: '🍉' },
	{ keyword: 'nanas', icon: '🍍' },
	{ keyword: 'kelapa', icon: '🥥' },
	{ keyword: 'stroberi', icon: '🍓' },
	{ keyword: 'melon', icon: '🍈' },
	{ keyword: 'persik', icon: '🍑' },
	{ keyword: 'ceri', icon: '🍒' },
	{ keyword: 'alpukat', icon: '🥑' },
	{ keyword: 'jambu', icon: '🍐' }, 
	{ keyword: 'delima', icon: '🍎' }
];

export function getPlantIcon(typeName: string | undefined | null): string {
	if (!typeName) return '🌿';

	const normalized = typeName.toLowerCase();
	const match = FRUIT_ICONS.find((entry) => normalized.includes(entry.keyword));

	return match?.icon ?? '🌿';
}