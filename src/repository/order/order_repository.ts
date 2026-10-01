import type { OrderRepository } from '../../core/repository/order_repository'
import { fetchAdminOrder, fetchAdminOrders, fetchMyOrders, patchOrderStatus } from '../api/order/order_api'

const orderRepository: OrderRepository = {
	getMyOrders: fetchMyOrders,
	getAdminOrders: fetchAdminOrders,
	getAdminOrder: fetchAdminOrder,
	updateStatus: patchOrderStatus,
}

export default orderRepository
