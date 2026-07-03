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

export interface PlantType {
	id: number;
	name: string;
	description: string;
}

export interface Plant {
	id: number;
	plant_type_id: number;
	name: string;
	scientific_name: string;
	planted_at: string;
}
