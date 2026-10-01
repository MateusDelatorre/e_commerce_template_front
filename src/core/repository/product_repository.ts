import type { Product, ProductPage, ProductSummary, ProductSummaryPage } from '../model/product'

export interface ProductRepository {
	getProducts(page?: number, perPage?: number): Promise<ProductPage>
	getProduct(id: number): Promise<Product>
	getFeaturedProducts(): Promise<ProductSummary[]>
	getNewProducts(perPage?: number): Promise<ProductSummaryPage>
	searchProducts(query: string, sort?: string, perPage?: number): Promise<ProductSummaryPage>
}
