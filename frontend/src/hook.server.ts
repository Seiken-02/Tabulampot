// src/hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';

const protectedPrefixes = ['/dashboard', '/plants'];

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session');

	if (token) {
		try {
			const res = await fetch(`${BACKEND_URL}/api/protected/profile`, {
				headers: { Authorization: `Bearer ${token}` }
			});

			if (res.ok) {
				const data = await res.json();
				event.locals.user = data.user; // { id, email } dari JWT payload
				event.locals.token = token;
			} else {
				// Token invalid/expired di mata backend — bersihkan cookie
				event.cookies.delete('session', { path: '/' });
			}
		} catch {
			// Backend nggak bisa dihubungi — anggap belum login, jangan crash
		}
	}

	const isProtected = protectedPrefixes.some((p) => event.url.pathname.startsWith(p));

	if (isProtected && !event.locals.user) {
		const redirectTo = event.url.pathname + event.url.search;
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
	}

	return resolve(event);
};