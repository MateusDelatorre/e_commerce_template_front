import authServiceInstance from '../../../presentation/auth/auth_service'
import { apiBaseUrl } from '../api_base'
import { parseApiResponse } from '../parse_response'
import type { NewProduct, Product, ProductPage, ProductSummary, ProductSummaryPage } from '../../../core/model/product'

type ProductResponse = ProductPage | {
	data: Product[]
	meta: Pick<ProductPage, 'current_page' | 'last_page' | 'per_page' | 'total'>
}
type ProductListResponse = ProductSummary[] | { data: ProductSummary[] }

export async function fetchProducts(page = 1, perPage = 12): Promise<ProductPage> {
	const response = await fetch(`${apiBaseUrl}admin/products?page=${page}&per_page=${perPage}`, {
		headers: { Accept: 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
	})
	const data = await parseApiResponse<ProductResponse>(response, 'Não foi possível carregar os produtos')
	if ('current_page' in data) return data
	return {
		data: data.data,
		current_page: data.meta.current_page,
		last_page: data.meta.last_page,
		per_page: data.meta.per_page,
		total: data.meta.total,
	}
}

export async function fetchProduct(id: number): Promise<Product> {
	const response = await fetch(`${apiBaseUrl}products/${id}`, {
		headers: { Accept: 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
	})
	return parseApiResponse<Product>(response, 'Não foi possível carregar o produto')
}

export async function fetchFeaturedProducts(): Promise<ProductSummary[]> {
	const response = await fetch(`${apiBaseUrl}products/featured`, {
		headers: { Accept: 'application/json' },
	})
	const data = await parseApiResponse<ProductListResponse>(response, 'Não foi possível carregar os produtos em destaque')
	return Array.isArray(data) ? data : data.data
}

export async function fetchNewProducts(perPage = 8): Promise<ProductSummaryPage> {
	const response = await fetch(`${apiBaseUrl}products/new?per_page=${perPage}`, {
		headers: { Accept: 'application/json' },
	})
	return parseApiResponse<ProductSummaryPage>(response, 'Não foi possível carregar os produtos novos')
}

export async function searchProducts(query: string, sort = 'name_asc', perPage = 24): Promise<ProductSummaryPage> {
	const params = new URLSearchParams({ q: query, sort, per_page: String(perPage) })
	const response = await fetch(`${apiBaseUrl}products/search?${params.toString()}`, {
		headers: { Accept: 'application/json' },
	})
	return parseApiResponse<ProductSummaryPage>(response, 'Não foi possível buscar os produtos')
}

export async function postProduct(product: NewProduct) {
	const body = new FormData()
	body.append('name', product.name)
	body.append('description', product.description)
	body.append('price', String(product.price))
	body.append('stock', String(product.stock))
	body.append('discount', String(product.discount))
	body.append('is_featured', product.is_featured ? '1' : '0')
	if (product.image) body.append('image', product.image)

	const response = await fetch(`${apiBaseUrl}products`, {
		method: 'POST',
		headers: { Accept: 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
		body,
	})
	return parseApiResponse(response, 'Não foi possível criar o produto')
}

export async function updateProduct(id: number, product: NewProduct) {
	const body = new FormData()
	body.append('_method', 'PATCH')
	body.append('name', product.name)
	body.append('description', product.description)
	body.append('price', String(product.price))
	body.append('stock', String(product.stock))
	body.append('discount', String(product.discount))
	body.append('is_featured', product.is_featured ? '1' : '0')
	if (product.image) body.append('image', product.image)

	const response = await fetch(`${apiBaseUrl}products/${id}`, {
		method: 'POST',
		headers: { Accept: 'application/json', Authorization: `Bearer ${authServiceInstance.getToken()}` },
		body,
	})
	return parseApiResponse(response, 'Não foi possível atualizar o produto')
}
