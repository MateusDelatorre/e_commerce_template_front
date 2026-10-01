import orderRepository from '../../../repository/order/order_repository'

export default function getMyOrders(page = 1, perPage = 15) {
	return orderRepository.getMyOrders(page, perPage)
}