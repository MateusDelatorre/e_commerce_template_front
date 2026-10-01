import productRepository from '../../../repository/product/product_repository'
import type { ProductPage } from '../../model/product'

export default function getProducts(page = 1, perPage = 12): Promise<ProductPage> {
	return productRepository.getProducts(page, perPage)
}
