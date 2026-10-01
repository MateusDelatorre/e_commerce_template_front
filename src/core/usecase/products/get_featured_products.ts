import productRepository from '../../../repository/product/product_repository'
import type { ProductSummary } from '../../model/product'

export default function getFeaturedProducts(): Promise<ProductSummary[]> {
	return productRepository.getFeaturedProducts()
}
