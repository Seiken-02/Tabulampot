import { apiFetch } from './client';

export interface DashboardActivityItem {
	id: number;
	plantId: number;
	plantName: string;
	activityType: 'watering' | 'fertilizing';
	activityDate: string;
}

export interface DashboardCalendarMark {
	activityType: 'watering' | 'fertilizing';
	activityDate: string;
}

export interface DashboardSummary {
	totalPlants: number;
	needWatering: number;
	needFertilizing: number;
	recentActivity: DashboardActivityItem[];
	calendarMarks: DashboardCalendarMark[];
}

export function getDashboardSummary() {
	return apiFetch<DashboardSummary>('/api/dashboard');
}