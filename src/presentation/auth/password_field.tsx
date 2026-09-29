export default function PasswordField() {
  return (
	<>
		<label htmlFor="password">Enter password</label>
		<span id="passwordFeedback" className="error-msg"></span>
		<input
			id="password"
			placeholder="Password"
			type="password"
			autoComplete="current-password"
		/>
	</>
  )
}