import authServiceInstance from "../../../presentation/auth/auth_service";
import { apiBaseUrl } from "../api_base";
import ErrorMatcher from "../../error/error_matcher";
import type UserModel from "../../../core/model/user";
import UserData from "../../model/user";

export default function getUserData(): Promise<UserModel> {
	return fetch(`${apiBaseUrl}profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${authServiceInstance.getToken()}`
		},
	}).then((response) => {
			return response.json().then((data) => {
				if (!response.ok) {
					if (data.message) {
						ErrorMatcher(data.message);
					}
					throw new Error(data.message ?? 'No error Message')
				}
				const user = data.data ?? data;
				return new UserData(user.id, user.name, user.email, user.number, user.role);
			})
		})
}