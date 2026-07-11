import { apiFetch } from './client';

interface RegisterPayload {
	name: string;
	email: string;
	password: string;
}

interface LoginPayload {
	email: string;
	password: string;
}

interface RegisterResponse {
	message: string;
}

interface LoginResponse {
	token: string;
}

export function registerUser(payload: RegisterPayload) {
	return apiFetch<RegisterResponse>('/api/auth/register', {
		method: 'POST',
		body: payload
	});
}

export function loginUser(payload: LoginPayload) {
	return apiFetch<LoginResponse>('/api/auth/login', {
		method: 'POST',
		body: payload
	});
}