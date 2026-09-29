import { useEffect, useMemo, useState } from 'react'
import MainHeader from '../components/main_header'
import { navigateToLogin, navigateToRegister } from '../../router'
import OfferRibbon from '../components/offer_ribbon'
import MainPageCarrousel from '../components/main_page_carrousel'

type Product = {
	id: number
	title: string
	brand?: string
	price: number
	discountPercentage: number
	rating: number
	thumbnail: string
}

const API_URL = 'https://dummyjson.com/products/category/fragrances?limit=12'

export default function MainPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		fetch(API_URL)
			.then((response) => {
				if (!response.ok) throw new Error('Unable to load products')
				return response.json()
			})
			.then((data: { products: Product[] }) => setProducts(data.products))
			.catch(() => setError('Could not load collection. Try again.'))
			.finally(() => setLoading(false))
	}, [])

	const filteredProducts = useMemo(() => products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase())), [products, query])
	const highlights = filteredProducts.slice(0, 4)
	const newArrivals = filteredProducts.slice(4, 8)

	return (
		<main className="storefront">
			<OfferRibbon />
			<MainHeader onLogin={navigateToLogin}/>

			<MainPageCarrousel />

			<section className="catalog-section" id="highlights">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Editor&apos;s selection</p>
						<h2>Highlights</h2>
					</div>
					<span className="section-count">01 / 03</span>
				</div>
				<ProductGrid products={highlights} loading={loading} error={error} />
			</section>

			<section className="offer-band" id="offers">
				<div>
					<p className="eyebrow">A little extra</p>
					<h2>More scent,<br /><em>less hesitation.</em></h2>
				</div>
				<p>Discover something new with 15% off your first order. Your next signature is closer than you think.</p>
				<button className="dark-button" onClick={navigateToRegister}>Claim your welcome offer <span>↗</span></button>
			</section>

			<section className="catalog-section" id="new">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Freshly arrived</p>
						<h2>New in</h2>
					</div>
					<span className="section-count">03 / 03</span>
				</div>
				<ProductGrid products={newArrivals} loading={loading} error={error} />
			</section>
			
			<footer className="site-footer">
				<a className="wordmark" href="#top">Sillage<span>.</span></a>
				<p>Fragrance for the in-between moments.</p>
				<div className="footer-search">
					<label htmlFor="search">Search collection</label>
					<input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try 'woody' or 'floral'" />
				</div>
			</footer>
		</main>
	)
}

function ProductGrid({ products, loading, error }: { products: Product[]; loading: boolean; error: string }) {
	if (loading) return <div className="catalog-state">Loading collection...</div>
	if (error) return <div className="catalog-state">{error}</div>
	if (!products.length) return <div className="catalog-state">No fragrances match your search.</div>
	return (
		<div className="product-grid">{products.map((product) =>
			<article className="product-card" key={product.id}>
				<div className="product-image">
					<img src={product.thumbnail} alt={product.title} />
					<span className="product-tag">{product.discountPercentage > 10 ? 'Offer' : 'New'}</span>
				</div>
				<div className="product-info">
					<div>
						<h3>{product.title}</h3>
						<p>{product.brand || 'Sillage collection'}</p>
					</div>
					<strong>${product.price.toFixed(2)}</strong>
				</div>
				<div className="rating">
					★★★★★ <span>{product.rating.toFixed(1)}</span>
				</div>
			</article>)}
		</div>
	)
}