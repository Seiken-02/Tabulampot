import { apiFetch } from './client';
import type { PlantType } from '$lib/types';

export function getPlantTypes() {
	return apiFetch<PlantType[]>('/api/plant-types');
}