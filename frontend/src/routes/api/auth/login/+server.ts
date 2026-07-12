import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = await request.json();

	const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	});

	const data = await res.json();

	if (!res.ok) {
		return json({ message: data.message ?? 'Login gagal' }, { status: res.status });
	}

	// Samakan maxAge dengan expiresIn: "1d" di backend
	cookies.set('session', data.token, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24
	});

	return json({ success: true });
};