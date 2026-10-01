import checkoutRepository from '../../../repository/checkout/checkout_repository'
import type { PlaceOrderInput } from '../../model/checkout'

export default function placeOrder(input: PlaceOrderInput) {
	return checkoutRepository.placeOrder(input)
}
