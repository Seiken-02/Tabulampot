import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import type { RequestHandler } from './';

export const POST: RequestHandler = async ({ request }) => {
	const { name, email, password } = await request.json();

	const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, email, password })
	});

	const data = await res.json();

	if (!res.ok) {
		return json({ message: data.message ?? 'Registrasi gagal' }, { status: res.status });
	}

	return json({ success: true });
};