import { useState } from "react";
import { login } from "../../api/user"
import EmailField from "./email_field"
import PasswordField from "./password_field"
import { navigateToHome } from "../../router"


export default function LoginPage({ onBack }: { onBack: () => void }) {
	const [is_loading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	function handleLogin(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const emailInput = document.querySelector<HTMLInputElement>('input[type="email"]')
		const passwordInput = document.querySelector<HTMLInputElement>('input[type="password"]')
		if (!emailInput || !passwordInput) return
		const email = emailInput.value
		const password = passwordInput.value
		setIsLoading(true);
		login(email, password).then((data) => {
			console.log(data)
			setIsLoading(false);
			navigateToHome()
		}).catch((error) => {
			console.error(error)
			setError(error.message);
			setIsLoading(false);
		})
	}
  return (
	<div className="auth-page">
		<button className="back-button" onClick={onBack}>← Back to store</button>
		<div className="auth-box">
			<p className="eyebrow">Welcome back</p>
			<h1>Log in to NomeDaLoja.</h1>
			<form onSubmit={handleLogin}>
				<EmailField/>
				<PasswordField/>
				{is_loading ? (
					<button className="dark-button" disabled>Loading...</button>
				) : (
					<button className="dark-button" type="submit">Log in <span>↗</span></button>
				)}
			</form>
			{error && <p className="error-msg">{error}</p>}
		</div>
	</div>
  )
}