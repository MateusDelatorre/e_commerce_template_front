export default function EmailField() {

  return (
	<>
		<label htmlFor="email">Enter email</label>
		<input
			id="email"
			placeholder="Email address"
			type="email"
			autoComplete="email"
		/>
	</>
	)
}