import orderRepository from '../../../repository/order/order_repository'
import type { OrderStatus } from '../../model/order'

export default function updateOrderStatus(id: number, status: Extract<OrderStatus, 'delivered' | 'cancelled'>) {
	return orderRepository.updateStatus(id, status)
}