import ErrorMatcher from '../error/error_matcher'

export async function parseApiResponse<T>(response: Response, fallback: string): Promise<T> {
	const data = await response.json().catch(() => null)
	const message = typeof data?.message === 'string'
		? data.message
		: typeof data?.error === 'string'
			? data.error
			: fallback

	if (!response.ok) {
		if (response.status === 401 || message.includes('Unauthenticated')) ErrorMatcher('Unauthenticated')
		throw new Error(message)
	}

	return data as T
}