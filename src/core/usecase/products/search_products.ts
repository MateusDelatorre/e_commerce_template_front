import productRepository from '../../../repository/product/product_repository'
import type { ProductSummaryPage } from '../../model/product'

export default function searchProducts(query: string, sort = 'name_asc', perPage?: number): Promise<ProductSummaryPage> {
	return productRepository.searchProducts(query, sort, perPage)
}
