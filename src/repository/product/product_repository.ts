import type { ProductRepository } from '../../core/repository/product_repository'
import { fetchFeaturedProducts, fetchNewProducts, fetchProduct, fetchProducts, searchProducts } from '../api/product/product_api'

const productRepository: ProductRepository = {
	getProducts: fetchProducts,
	getProduct: fetchProduct,
	getFeaturedProducts: fetchFeaturedProducts,
	getNewProducts: fetchNewProducts,
	searchProducts,
}

export default productRepository
