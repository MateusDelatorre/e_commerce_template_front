import authServiceInstance from "../../presentation/auth/auth_service";
import onUnauthenticated from "./on_unauthenticated";

export default function ErrorMatcher(error: string){
	if (error.includes("Unauthenticated")) {
		console.log("Unauthenticated error detected, redirecting to login page...");
		onUnauthenticated();
		authServiceInstance.clearToken();
		return;
	}
}