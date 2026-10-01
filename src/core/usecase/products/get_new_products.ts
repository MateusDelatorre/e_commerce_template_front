import productRepository from '../../../repository/product/product_repository'
import type { ProductSummaryPage } from '../../model/product'

export default function getNewProducts(perPage = 8): Promise<ProductSummaryPage> {
	return productRepository.getNewProducts(perPage)
}
