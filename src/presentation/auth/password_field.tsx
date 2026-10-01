export default function PasswordField() {
  return (
	<>
		<label htmlFor="password">Digite sua senha</label>
		<span id="passwordFeedback" className="error-msg"></span>
		<input
			id="password"
			placeholder="Senha"
			type="password"
			autoComplete="current-password"
		/>
	</>
  )
}