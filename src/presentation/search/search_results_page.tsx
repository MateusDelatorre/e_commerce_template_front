import { useEffect, useState } from 'react'
import { navigateTo, navigateToLogin } from '../../router'
import type { ProductSummary } from '../../core/model/product'
import searchProducts from '../../core/usecase/products/search_products'
import MainHeader from '../components/main_header'
import formatBrl from '../utils/format_brl'
import './search_results_page.css'

const sortOptions = [
	{ value: 'name_asc', label: 'Nome: A-Z' },
	{ value: 'name_desc', label: 'Nome: Z-A' },
	{ value: 'price_asc', label: 'Preço: menor primeiro' },
	{ value: 'price_desc', label: 'Preço: maior primeiro' },
]

export default function SearchResultsPage() {
	const initialQuery = new URLSearchParams(window.location.search).get('q') ?? ''
	const [query, setQuery] = useState(initialQuery)
	const [submittedQuery, setSubmittedQuery] = useState(initialQuery)
	const [sort, setSort] = useState('name_asc')
	const [products, setProducts] = useState<ProductSummary[]>([])
	const [loading, setLoading] = useState(Boolean(initialQuery))
	const [error, setError] = useState('')

	useEffect(() => {
		if (!submittedQuery) return
		let active = true
		setLoading(true)
		setError('')
		searchProducts(submittedQuery, sort)
			.then((result) => { if (active) setProducts(result.data) })
			.catch((reason: Error) => { if (active) setError(reason.message) })
			.finally(() => { if (active) setLoading(false) })
		return () => { active = false }
	}, [submittedQuery, sort])

	function submitSearch() {
		const nextQuery = query.trim()
		if (!nextQuery) return
		window.history.replaceState({}, '', `/search?q=${encodeURIComponent(nextQuery)}`)
		setSubmittedQuery(nextQuery)
	}

	return (
		<main className="search-results-page">
			<MainHeader onLogin={navigateToLogin} searchValue={query} onSearchChange={setQuery} onSearchSubmit={submitSearch} />
			<section className="search-results-shell">
				<button className="search-results-back" type="button" onClick={() => navigateTo('/')}>← Voltar à coleção</button>
				<div className="search-results-heading">
					<div>
						<p className="eyebrow">Busca no catálogo</p>
						<h1>Resultados</h1>
						<p>{submittedQuery ? `Produtos encontrados para “${submittedQuery}”` : 'Digite um produto para começar sua busca.'}</p>
					</div>
					{submittedQuery && <label className="search-sort">Ordenar por<select value={sort} onChange={(event) => setSort(event.target.value)}>{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>}
				</div>
				{loading && <div className="search-results-state">Buscando produtos...</div>}
				{!loading && error && <div className="search-results-state error">{error}</div>}
				{!loading && !error && submittedQuery && !products.length && <div className="search-results-state">Nenhum produto encontrado.</div>}
				{!loading && !error && products.length > 0 && <div className="search-result-grid">{products.map((product) => <a className="product-card-link" href={`/products/${product.id}`} key={product.id}><article className="product-card"><div className="product-image">{product.image_url ? <img src={product.image_url} alt={product.name} /> : <span aria-hidden="true">N°</span>}<span className="product-tag">{Number(product.discount) > 0 ? 'Oferta' : 'Produto'}</span></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><strong>{formatBrl(product.price)}</strong></div></article></a>)}</div>}
			</section>
		</main>
	)
}
