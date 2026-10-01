import authServiceInstance from "../../presentation/auth/auth_service";
import { apiBaseUrl } from "./api_base";

export function login(email: string, password: string){
	return apiLogin(email, password)
}

function apiLogin(email: string, password: string) {
	const body =
        `email=${encodeURIComponent(email)}` +
        `&password=${encodeURIComponent(password)}`;
	return fetch(`${apiBaseUrl}login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	}).then((response) => {
		return response.json().then((data) => {
			if (!response.ok) {
				console.error('Login failed', data)
				throw new Error(data.message ?? 'Não foi possível entrar')
			}
			authServiceInstance.setToken(data.token)
			return data
		})
	})
}