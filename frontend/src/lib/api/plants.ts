import { apiFetch } from './client';
import { getToken } from '$lib/stores/auth.svelte';
import type { Plant } from '$lib/types';

interface PlantPayload {
	plantTypeId: number;
	nickname: string;
	plantingDate?: string;
	location?: string;
	notes?: string;
}

export function getPlants() {
	return apiFetch<Plant[]>('/api/plants', {
		token: getToken() ?? undefined
	});
}

export function getPlantById(id: string) {
	return apiFetch<Plant>(`/api/plants/${id}`, {
		token: getToken() ?? undefined
	});
}

export function createPlant(payload: PlantPayload) {
	return apiFetch<Plant>('/api/plants', {
		method: 'POST',
		body: payload,
		token: getToken() ?? undefined
	});
}

export function updatePlant(id: string, payload: PlantPayload) {
	return apiFetch<Plant>(`/api/plants/${id}`, {
		method: 'PUT',
		body: payload,
		token: getToken() ?? undefined
	});
}

export function deletePlant(id: string) {
	return apiFetch<{ message: string }>(`/api/plants/${id}`, {
		method: 'DELETE',
		token: getToken() ?? undefined
	});
}