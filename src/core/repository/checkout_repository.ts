import type { CheckoutAddress, PlaceOrderInput, PlacedOrder } from '../model/checkout'

export interface CheckoutRepository {
	getAddresses(): Promise<CheckoutAddress[]>
	placeOrder(input: PlaceOrderInput): Promise<PlacedOrder>
}
