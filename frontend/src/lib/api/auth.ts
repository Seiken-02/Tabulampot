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
	success: true;
}

interface LoginResponse {
	success: true;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	const result = await res.json();

	if (!res.ok) {
		throw new Error(result.message ?? 'Terjadi kesalahan pada server');
	}

	return result;
}

export function registerUser(payload: RegisterPayload) {
	return postJson<RegisterResponse>('/api/auth/register', payload);
}

export function loginUser(payload: LoginPayload) {
	return postJson<LoginResponse>('/api/auth/login', payload);
}