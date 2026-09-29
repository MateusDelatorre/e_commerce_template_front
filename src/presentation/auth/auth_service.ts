// AuthService.js
class AuthService {
	private token: string | null;

	public constructor() {
		this.token = null;
	}

	public setToken(newToken: string) {
		this.token = newToken;
		localStorage.setItem("key", newToken);
	}

	public getToken() {
		if (this.token === null) {
			this.token = localStorage.getItem("key");
		}
		return this.token;
	}

	public clearToken() {
		this.token = null;
		localStorage.removeItem("key");
	}
}

// Instantiate and export the single instance
const authServiceInstance = new AuthService();
export default authServiceInstance;
