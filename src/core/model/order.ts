export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type AdminOrder = {
	id: number
	public_reference: string
	status: OrderStatus
	payment_method: 'pix' | 'cash'
	total: number | string
	created_at: string
	user: {
		id: number
		name: string
		email: string
		phone: string | null
	} | null
	endereco: {
		id: number
		addressName: string
		receiverName: string
		streetName: string
		number: string
		addressComplement: string | null
		city: string
		state: string
		cep: string
		phone: string | null
	} | null
	items: Array<{
		id: number
		product_id: number
		product: { id: number; name: string; image_url: string | null } | null
		quantity: number
		unit_price: number | string
		discount: number | string
		subtotal: number | string
	}>
}

export type AdminOrderPage = {
	data: AdminOrder[]
	current_page: number
	last_page: number
	per_page: number
	total: number
}
