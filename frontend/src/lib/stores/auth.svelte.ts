let token = $state<string | null>(null);

export function getToken() {
	return token;
}

export function isLoggedIn() {
	return token !== null;
}

export function setToken(newToken: string) {
	token = newToken;
	localStorage.setItem('auth_token', newToken);
}

export function clearAuth() {
	token = null;
	localStorage.removeItem('auth_token');
}

export function loadAuthFromStorage() {
	const savedToken = localStorage.getItem('auth_token');
	if (savedToken) {
		token = savedToken;
	}
}