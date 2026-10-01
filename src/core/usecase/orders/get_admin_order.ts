import orderRepository from '../../../repository/order/order_repository'

export default function getAdminOrder(id: number) {
	return orderRepository.getAdminOrder(id)
}