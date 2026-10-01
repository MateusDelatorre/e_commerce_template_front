import orderRepository from '../../../repository/order/order_repository'

export default function getAdminOrders(page = 1, perPage = 15) {
	return orderRepository.getAdminOrders(page, perPage)
}
