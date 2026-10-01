import { useEffect, useState } from 'react'
import { navigateTo, navigateToHome, navigateToLogin } from '../../router'
import type { Product } from '../../core/model/product'
import addToBag from '../../core/usecase/bag/add_to_bag'
import getProduct from '../../core/usecase/products/get_product'
import MainHeader from '../components/main_header'
import formatBrl from '../utils/format_brl'
import './product_page.css'

type ProductPageProps = {
	productId: number
}

export default function ProductPage({ productId }: ProductPageProps) {
	const [product, setProduct] = useState<Product | null>(null)
	const [loadedProductId, setLoadedProductId] = useState<number | null>(null)
	const [error, setError] = useState('')
	const loading = loadedProductId !== productId

	useEffect(() => {
		let active = true
		getProduct(productId)
			.then((result) => {
				if (!active) return
				setProduct(result)
				setError('')
				setLoadedProductId(productId)
			})
			.catch((reason: Error) => {
				if (!active) return
				setError(reason.message)
				setLoadedProductId(productId)
			})
		return () => { active = false }
	}, [productId])

	return (
		<main className="product-page">
			<MainHeader onLogin={navigateToLogin} />
			<div className="product-detail-shell">
				<a className="product-back-link" href="/" onClick={(event) => { event.preventDefault(); navigateToHome() }}>
					<span aria-hidden="true">←</span> Voltar à coleção
				</a>

				{loading && <div className="product-detail-state">Carregando produto...</div>}
				{!loading && error && <div className="product-detail-state error">{error}</div>}
				{!loading && !error && product && <ProductDetails product={product} />}
			</div>
		</main>
	)
}

function ProductDetails({ product }: { product: Product }) {
	const discount = Number(product.discount)
	const price = Number(product.price)
	const [isAdded, setIsAdded] = useState(false)

	function handleAddToBag() {
		addToBag(product)
		setIsAdded(true)
		window.setTimeout(() => navigateTo('/bag?added=1'), 350)
	}

	return (
		<article className="product-detail">
			<div className="product-detail-image">
				{product.image_url ? <img src={product.image_url} alt={product.name} /> : <span className="product-detail-image-fallback">N°</span>}
				<span className="product-detail-tag">{product.is_featured ? 'Destaque' : discount > 0 ? 'Oferta' : 'Novidade'}</span>
			</div>
			<div className="product-detail-copy">
				<p className="eyebrow">A coleção / {String(product.id).padStart(2, '0')}</p>
				<h1>{product.name}</h1>
				<div className="product-detail-description-block">
					<span>Sobre a fragrância</span>
					<p className="product-detail-description">{product.description}</p>
				</div>
				<div className="product-detail-pricing">
					<div>
						<span>Preço</span>
						<strong className="product-detail-price">{formatBrl(price)}</strong>
					</div>
					{discount > 0 && (
						<div>
							<span>Desconto</span>
							<strong>{discount}% de desconto</strong>
						</div>
					)}
				</div>
				<button className="product-detail-action" type="button" onClick={handleAddToBag}>
					{isAdded ? 'Adicionado à sacola' : 'Adicionar à sacola'}
					<span aria-hidden="true">↗</span>
				</button>
			</div>
		</article>
	)
}