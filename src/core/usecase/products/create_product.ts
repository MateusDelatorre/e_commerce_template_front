import { postProduct } from '../../../repository/api/product/product_api'
import type { NewProduct } from '../../model/product'

export default function createProduct(product: NewProduct) {
	return postProduct(product)
}
