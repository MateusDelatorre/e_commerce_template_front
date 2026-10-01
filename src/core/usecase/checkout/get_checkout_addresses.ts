import checkoutRepository from '../../../repository/checkout/checkout_repository'

export default function getCheckoutAddresses() {
	return checkoutRepository.getAddresses()
}
