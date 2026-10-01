export default function EmailField() {

  return (
	<>
		<label htmlFor="email">Digite seu e-mail</label>
		<input
			id="email"
			placeholder="E-mail"
			type="email"
			autoComplete="email"
		/>
	</>
	)
}