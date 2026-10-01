import type { Product } from './product'

export type BagItem = {
	productId: number
	name: string
	price: number | string
	imageUrl: string | null
	stock?: number
	quantity: number
}

export function toBagItem(product: Product): BagItem {
	return {
		productId: product.id,
		name: product.name,
		price: product.price,
		imageUrl: product.image_url,
		stock: product.stock,
		quantity: 1,
	}
}
