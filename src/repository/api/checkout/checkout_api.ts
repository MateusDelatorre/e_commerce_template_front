import authServiceInstance from '../../../presentation/auth/auth_service'
import type { CheckoutAddress, PlaceOrderInput, PlacedOrder } from '../../../core/model/checkout'
import { apiBaseUrl } from '../api_base'

async function parseResponse<T>(response: Response, fallback: string): Promise<T> {
	const data = await response.json().catch(() => null)
	if (!response.ok) {
		const message = typeof data?.message === 'string' ? data.message : typeof data?.error === 'string' ? data.error : fallback
		throw new Error(message)
	}
	return data as T
}

export async function fetchCheckoutAddresses(): Promise<CheckoutAddress[]> {
	const response = await fetch(`${apiBaseUrl}enderecos`, {
		headers: { Accept: 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
	})
	const data = await parseResponse<CheckoutAddress[]>(response, 'Não foi possível carregar seus endereços')
	return Array.isArray(data) ? data : []
}

export async function submitOrder(input: PlaceOrderInput): Promise<PlacedOrder> {
	const response = await fetch(`${apiBaseUrl}orders`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authServiceInstance.getToken()}`,
		},
		body: JSON.stringify(input),
	})
	const data = await parseResponse<{ order: PlacedOrder }>(response, 'Não foi possível finalizar o pedido')
	return data.order
}
