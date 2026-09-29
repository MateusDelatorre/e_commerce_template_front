import authServiceInstance from "../../presentation/auth/auth_service";
import { apiBaseUrl } from "../api_base";

export default async function updateUserData(name: string, phone: string, email: string) {
	const response = await fetch(`${apiBaseUrl}usuarios`, {
		method: 'PATCH',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${authServiceInstance.getToken()}`,
		},
		body: JSON.stringify({ name, phone, email }),
	});
	return response.json();
}