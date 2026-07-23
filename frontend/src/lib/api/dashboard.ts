import { apiFetch } from './client';

export interface DashboardSummary {
	totalPlants: number;
	needWatering: number;
	needFertilizing: number;
}

export function getDashboardSummary() {
	return apiFetch<DashboardSummary>('/api/dashboard');
}