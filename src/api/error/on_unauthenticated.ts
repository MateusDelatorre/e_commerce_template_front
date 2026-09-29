import { navigateTo } from "../../router";

export default function onUnauthenticated() {
	// Handle unauthenticated error, e.g., redirect to login page
	navigateTo('/login');
}