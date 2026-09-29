import authServiceInstance from "../../presentation/auth/auth_service";
import { apiBaseUrl } from "../api_base";
import ErrorMatcher from "../error/error_matcher";

export default function getUserData() {
	return fetch(`${apiBaseUrl}user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${authServiceInstance.getToken()}`
		},
	}).then((response) => {
			return response.json().then((data) => {
				if (!response.ok) {
					console.error('Get user data failed', data)
					console.log('data messge', data.message)
					if (data.message) {
						ErrorMatcher(data.message);
					}
					throw new Error(data.message ?? 'No error Message')
				}
				console.log('Get user data successful', data)
				return data.data
			})
		})
}