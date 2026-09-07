import { login } from "../api/user"


export default function LoginPage({ onBack }: { onBack: () => void }) {
	function handleLogin() {
		const emailInput = document.querySelector<HTMLInputElement>('input[type="email"]')
		const passwordInput = document.querySelector<HTMLInputElement>('input[type="password"]')
		if (!emailInput || !passwordInput) return
		const email = emailInput.value
		const password = passwordInput.value
		login(email, password).then((data) => {
			console.log(data)
		}).catch((error) => {
			console.error(error)
		})
	}
  return (
	<div className="auth-page">
		<button className="back-button" onClick={onBack}>← Back to store</button>
		<div className="auth-box">
			<p className="eyebrow">Welcome back</p>
			<h1>Log in to NomeDaLoja.</h1>
			<form>
				<label htmlFor="email">Enter email</label>
				<input id="email" placeholder="Email address" type="email" autoComplete="email" />
				<span id="emailFeedback" className="error-msg"></span>
				<label htmlFor="password">Enter password</label>
				<input id="password" placeholder="Password" type="password" autoComplete="current-password" />
				<span id="passwordFeedback" className="error-msg"></span>
				<button className="dark-button" onClick={handleLogin}>Log in <span>↗</span></button>
			</form>
		</div>
	</div>
  )
}