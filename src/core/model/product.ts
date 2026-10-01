export type Product = {
	id: number
	name: string
	description: string
	price: number | string
	image_url: string | null
	stock: number
	discount: number | string
	is_featured: boolean
	total_sold?: number
	created_at: string
}

export interface ProductMinimal{
	id: number
	name: string
	price: number | string
	image_url: string | null
	discount: number | string
	description: string
}

export type ProductPage = {
	data: Product[]
	current_page: number
	last_page: number
	per_page: number
	total: number
}

export type ProductSummary = Pick<Product, 'id' | 'name' | 'price' | 'discount' | 'image_url' | 'description'>

export type ProductSummaryPage = {
	data: ProductSummary[]
	current_page: number
	last_page: number
	per_page: number
	total: number
}

export type NewProduct = {
	name: string
	description: string
	price: number
	stock: number
	discount: number
	is_featured: boolean
	image?: File
}
