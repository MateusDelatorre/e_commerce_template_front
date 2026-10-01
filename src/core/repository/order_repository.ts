import type { AdminOrder, AdminOrderPage } from '../model/order'

export interface OrderRepository {
	getMyOrders(page?: number, perPage?: number): Promise<AdminOrderPage>
	getAdminOrders(page?: number, perPage?: number): Promise<AdminOrderPage>
	getAdminOrder(id: number): Promise<AdminOrder>
	updateStatus(id: number, status: 'delivered' | 'cancelled'): Promise<AdminOrder>
}
