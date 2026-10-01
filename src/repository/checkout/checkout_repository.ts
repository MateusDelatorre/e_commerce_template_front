import type { CheckoutRepository } from '../../core/repository/checkout_repository'
import { fetchCheckoutAddresses, submitOrder } from '../api/checkout/checkout_api'

const checkoutRepository: CheckoutRepository = {
	getAddresses: fetchCheckoutAddresses,
	placeOrder: submitOrder,
}

export default checkoutRepository
