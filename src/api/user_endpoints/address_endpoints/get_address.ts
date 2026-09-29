import authServiceInstance from "../../../presentation/auth/auth_service";
import { apiBaseUrl } from "../../api_base";
import ErrorMatcher from "../../error/error_matcher";

export default function getAddress() {

	return fetch(`${apiBaseUrl}enderecos`, {
		method: 'GET',
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${authServiceInstance.getToken()}`,
		},
	}).then((response) => {
		return response.json().then((data) => {
			if (!response.ok) {
				console.error('Get address failed', data)
				console.log('data messge', data.message)
				if (data.message) {
					ErrorMatcher(data.message);
				}
				throw new Error(data.message ?? 'Get address failed')
			}
			console.log('Get address successful', data)
			const addresses = Array.isArray(data) ? data : data?.data
			return Array.isArray(addresses) ? addresses : []
		})
	})
}