
export function login(email: string, password: string){
	return apiLogin(email, password)
}

function apiLogin(email: string, password: string) {
	const body =
        `email=${encodeURIComponent(email)}` +
        `&password=${encodeURIComponent(password)}`;
	return fetch("http://127.0.0.1:8000/api/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	}).then((response) => {
		return response.json().then((data) => {
			if (!response.ok) {
				console.error('Login failed', data)
				throw new Error(data.message ?? 'Login failed')
			}
			return data
		})
	})
}

function mockLogin(email: string, password: string) {
	console.log('Mock login', email, password)
	return new Promise((resolve,) => {
		setTimeout(() => {
			resolve({ email, token: 'mock-token' })
		}, 1000)
	})
}