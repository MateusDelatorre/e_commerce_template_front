import { useEffect, useState } from 'react'
import MainHeader from '../components/main_header'
import { navigateTo, navigateToLogin } from '../../router'
import MainPageCarrousel from '../components/main_page_carrousel'
import getFeaturedProducts from '../../core/usecase/products/get_featured_products'
import getNewProducts from '../../core/usecase/products/get_new_products'
import type { ProductSummary } from '../../core/model/product'
import formatBrl from '../utils/format_brl'

export default function MainPage() {
	const [featuredProducts, setFeaturedProducts] = useState<ProductSummary[]>([])
	const [newProducts, setNewProducts] = useState<ProductSummary[]>([])
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		Promise.all([getFeaturedProducts(), getNewProducts()])
			.then(([featured, newest]) => {
				setFeaturedProducts(featured)
				setNewProducts(newest.data)
			})
			.catch(() => setError('Não foi possível carregar a coleção. Tente novamente.'))
			.finally(() => setLoading(false))
	}, [])

	function submitSearch() {
		const trimmedQuery = query.trim()
		if (trimmedQuery) navigateTo(`/search?q=${encodeURIComponent(trimmedQuery)}`)
	}

	return (
		<main className="storefront">
			<MainHeader
				onLogin={navigateToLogin}
				searchValue={query}
				onSearchChange={setQuery}
				onSearchSubmit={submitSearch}
			/>

			<MainPageCarrousel />

			<section className="catalog-section" id="highlights">
				<div className="section-heading">
					<div>
								<p className="eyebrow">Seleção editorial</p>
								<h2>Destaques</h2>
					</div>
					<span className="section-count">01 / 03</span>
				</div>
				<ProductGrid products={featuredProducts} loading={loading} error={error} />
			</section>

			<section className="catalog-section" id="new">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Recém-chegados</p>
						<h2>Novidades</h2>
					</div>
					<span className="section-count">03 / 03</span>
				</div>
				<ProductGrid products={newProducts} loading={loading} error={error} />
			</section>
			
			<footer className="site-footer">
				<a className="wordmark" href="#top">Sillage<span>.</span></a>
				<p>Fragrâncias para os momentos entre um instante e outro.</p>
			</footer>
		</main>
	)
}

function ProductGrid({ products, loading, error }: { products: ProductSummary[]; loading: boolean; error: string }) {
	if (loading) return <div className="catalog-state">Carregando coleção...</div>
	if (error) return <div className="catalog-state">{error}</div>
	if (!products.length) return <div className="catalog-state">Nenhuma fragrância encontrada.</div>
	return (
		<div className="product-grid">
			{products.map((product) => (
				<a className="product-card-link" href={`/products/${product.id}`} key={product.id}>
					<article className="product-card">
						<div className="product-image">
							{product.image_url ? <img src={product.image_url} alt={product.name} /> : <span aria-hidden="true">N°</span>}
							<span className="product-tag">{Number(product.discount) > 0 ? 'Oferta' : 'Novo'}</span>
						</div>
						<div className="product-info">
							<div>
								<h3>{product.name}</h3>
								<p>{product.description}</p>
							</div>
							<strong>{formatBrl(product.price)}</strong>
						</div>
					</article>
				</a>
			))}
		</div>
	)
}