export type CheckoutAddress = {
	id: number
	addressName: string
	receiverName?: string
	streetName: string
	number?: string
	addressComplement?: string
	city: string
	state: string
	cep?: string
	phone?: string
}

export type PaymentMethod = 'pix' | 'cash'

export type CheckoutItem = {
	product_id: number
	quantity: number
}

export type PlaceOrderInput = {
	endereco_id: number
	payment_method: PaymentMethod
	items: CheckoutItem[]
}

export type PlacedOrder = {
	id: number
	public_reference: string
	status: string
	payment_method: PaymentMethod
	total: number | string
}
