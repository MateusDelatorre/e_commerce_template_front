import productRepository from '../../../repository/product/product_repository'
import type { Product } from '../../model/product'

export default function getProduct(id: number): Promise<Product> {
	return productRepository.getProduct(id)
}
