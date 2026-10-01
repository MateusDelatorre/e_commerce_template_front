import { updateProduct as updateProductRequest } from '../../../repository/api/product/product_api'
import type { NewProduct } from '../../model/product'

export default function updateProduct(id: number, product: NewProduct) {
	return updateProductRequest(id, product)
}