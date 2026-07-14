export type ActivityAction = 'watering' | 'fertilizing';

export interface ActivityLog {
	id: number;
	plantId: number;
	activityType: ActivityAction;
	activityDate: string;
	notes: string | null;
	createdAt: string;
}

export interface User {
	id: number;
	email: string;
}

export interface PlantType {
	id: number;
	name: string;
	wateringInterval: number;
	fertilizingInterval: number;
	description: string | null;
}

export interface Plant {
	id: number;
	userId: number;
	plantTypeId: number;
	nickname: string;
	plantingDate: string | null;
	location: string | null;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
}