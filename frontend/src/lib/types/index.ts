export type ActivityAction = 'watering' | 'fertilizing';

export interface ActivityLog {
	id: number;
	user_id: number;
	plant_id: number;
	action: ActivityAction;  
	created_at: string;
}

export interface User {
	id: number;
	username: string;
	email: string;
	created_at: string;
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

export interface PlantType {
	id: number;
	name: string;
	wateringInterval: number;
	fertilizingInterval: number;
	description: string | null;
}
