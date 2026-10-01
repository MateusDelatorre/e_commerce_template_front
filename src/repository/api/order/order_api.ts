import authServiceInstance from '../../../presentation/auth/auth_service'
import type { AdminOrder, AdminOrderPage, OrderStatus } from '../../../core/model/order'
import { apiBaseUrl } from '../api_base'
import { parseApiResponse } from '../parse_response'

export async function fetchMyOrders(page = 1, perPage = 15): Promise<AdminOrderPage> {
	const response = await fetch(`${apiBaseUrl}orders/mine?page=${page}&per_page=${perPage}`, {
		headers: { Accept: 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
	})
	return parseApiResponse<AdminOrderPage>(response, 'Não foi possível carregar seus pedidos')
}

export async function fetchAdminOrders(page = 1, perPage = 15): Promise<AdminOrderPage> {
	const response = await fetch(`${apiBaseUrl}orders?page=${page}&per_page=${perPage}`, {
		headers: { Accept: 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
	})
	return parseApiResponse<AdminOrderPage>(response, 'Não foi possível carregar os pedidos')
}

export async function fetchAdminOrder(id: number): Promise<AdminOrder> {
	const response = await fetch(`${apiBaseUrl}orders/${id}`, {
		headers: { Accept: 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
	})
	return parseApiResponse<AdminOrder>(response, 'Não foi possível carregar o pedido')
}

export async function patchOrderStatus(id: number, status: Extract<OrderStatus, 'delivered' | 'cancelled'>): Promise<AdminOrder> {
	const response = await fetch(`${apiBaseUrl}orders/${id}`, {
		method: 'PATCH',
		headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
		body: JSON.stringify({ status }),
	})
	const data = await parseApiResponse<{ order: AdminOrder }>(response, 'Não foi possível atualizar o pedido')
	return data.order
}
