// src/lib/api/plants.ts
import { apiFetch } from './client';
import type { Plant, ActivityLog } from '$lib/types';

interface PlantPayload {
	plantTypeId: number;
	nickname: string;
	plantingDate?: string;
	location?: string;
	notes?: string;
}

export function getPlants() {
	return apiFetch<Plant[]>('/api/plants');
}

export function getPlantById(id: string) {
	return apiFetch<Plant>(`/api/plants/${id}`);
}

export function createPlant(payload: PlantPayload) {
	return apiFetch<Plant>('/api/plants', {
		method: 'POST',
		body: payload
	});
}

export function updatePlant(id: string, payload: PlantPayload) {
	return apiFetch<Plant>(`/api/plants/${id}`, {
		method: 'PUT',
		body: payload
	});
}

export function deletePlant(id: string) {
	return apiFetch<{ message: string }>(`/api/plants/${id}`, {
		method: 'DELETE'
	});
}

export function waterPlant(id: string) {
	return apiFetch<{ message: string }>(`/api/plants/${id}/water`, {
		method: 'POST'
	});
}

export function fertilizePlant(id: string) {
	return apiFetch<{ message: string }>(`/api/plants/${id}/fertilize`, {
		method: 'POST'
	});
}

export function getPlantHistory(id: string) {
	return apiFetch<ActivityLog[]>(`/api/plants/${id}/history`);
}