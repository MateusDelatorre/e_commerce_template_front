import { useEffect, useState } from 'react'
import type { ProductSummary } from '../../core/model/product'
import searchProducts from '../../core/usecase/products/search_products'
import { navigateTo } from '../../router'
import formatBrl from '../utils/format_brl'

type SearchComponentProps = {
	value: string
	onChange: (value: string) => void
	onSubmit: () => void
}

export default function SearchComponent({ value, onChange, onSubmit }: SearchComponentProps) {
	const [suggestions, setSuggestions] = useState<ProductSummary[]>([])
	const [isFocused, setIsFocused] = useState(false)
	const [isSearching, setIsSearching] = useState(false)

	useEffect(() => {
		const query = value.trim()
		if (query.length < 2) {
			setSuggestions([])
			setIsSearching(false)
			return
		}

		let active = true
		setIsSearching(true)
		const timer = window.setTimeout(() => {
			searchProducts(query, 'name_asc', 5)
				.then((result) => { if (active) setSuggestions(result.data) })
				.catch(() => { if (active) setSuggestions([]) })
				.finally(() => { if (active) setIsSearching(false) })
		}, 250)

		return () => {
			active = false
			window.clearTimeout(timer)
		}
	}, [value])

	function handleSubmit() {
		setIsFocused(false)
		onSubmit()
	}

	return (
		<form className="header-search" role="search" onSubmit={(event) => { event.preventDefault(); handleSubmit() }} onFocus={() => setIsFocused(true)}>
			<label htmlFor="product-search">Buscar</label>
			<div className="search-box">
				<input id="product-search" value={value} onChange={(event) => onChange(event.target.value)} onBlur={() => window.setTimeout(() => setIsFocused(false), 150)} placeholder="Buscar produtos" />
				<button type="submit" aria-label="Buscar produtos">Buscar</button>
			</div>
			{isFocused && value.trim().length >= 2 && <div className="search-suggestions" role="listbox">
				{suggestions.length > 0 ? suggestions.map((product) => <button className="search-suggestion" type="button" key={product.id} onMouseDown={() => navigateTo(`/products/${product.id}`)}><span><strong>{product.name}</strong><small>{product.description}</small></span><b>{formatBrl(product.price)}</b></button>) : <p>{isSearching ? 'Buscando produtos...' : 'Nenhum produto encontrado.'}</p>}
			</div>}
		</form>
	)
}
