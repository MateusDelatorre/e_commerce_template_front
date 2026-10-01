import { useEffect, useMemo, useState } from 'react'
import { navigateToHome, navigateToLogin } from '../../router'
import getBagItems from '../../core/usecase/bag/get_bag_items'
import removeFromBag from '../../core/usecase/bag/remove_from_bag'
import setBagQuantity from '../../core/usecase/bag/set_bag_quantity'
import type { BagItem } from '../../core/model/bag'
import MainHeader from '../components/main_header'
import formatBrl from '../utils/format_brl'
import './bag_page.css'

export default function BagPage() {
	const [items, setItems] = useState<BagItem[]>(getBagItems)
	const [wasAdded] = useState(() => new URLSearchParams(window.location.search).get('added') === '1')

	useEffect(() => {
		const updateItems = () => setItems(getBagItems())
		window.addEventListener('bag-updated', updateItems)
		return () => window.removeEventListener('bag-updated', updateItems)
	}, [])

	const total = useMemo(() => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [items])
	const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

	return (
		<main className="bag-page">
			<MainHeader onLogin={navigateToLogin} />
			<div className="bag-shell">
				<div className="bag-heading">
					<div>
						<p className="eyebrow">Sua seleção</p>
						<h1>Sua sacola</h1>
					</div>
					<span>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
				</div>

				{wasAdded && <p className="bag-feedback">Produto adicionado à sacola.</p>}

				{items.length === 0 ? (
					<div className="bag-empty">
						<p>Sua sacola está vazia.</p>
						<a href="/" onClick={(event) => { event.preventDefault(); navigateToHome() }}>Explorar coleção <span>↗</span></a>
					</div>
				) : (
					<div className="bag-layout">
						<div className="bag-items">
							{items.map((item) => <BagItemRow item={item} key={item.productId} onRemove={() => setItems(removeFromBag(item.productId))} onQuantityChange={(quantity) => setItems(setBagQuantity(item.productId, quantity))} />)}
						</div>
						<aside className="bag-summary">
							<span>Total</span>
							<strong>{formatBrl(total)}</strong>
							<p>Frete calculado na finalização do pedido.</p>
							<a className="bag-checkout-button" href="/checkout">Finalizar pedido <span>↗</span></a>
						</aside>
					</div>
				)}
			</div>
		</main>
	)
}

function BagItemRow({ item, onRemove, onQuantityChange }: { item: BagItem; onRemove: () => void; onQuantityChange: (quantity: number) => void }) {
	const maxQuantity = item.stock ?? undefined

	return (
		<article className="bag-item">
			<a className="bag-item-image" href={`/products/${item.productId}`}>
				{item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <span aria-hidden="true">N°</span>}
			</a>
			<div className="bag-item-info">
				<a href={`/products/${item.productId}`}><h2>{item.name}</h2></a>
				<div className="bag-item-quantity">
					<button type="button" aria-label={`Diminuir quantidade de ${item.name}`} disabled={item.quantity <= 1} onClick={() => onQuantityChange(item.quantity - 1)}>−</button>
					<input aria-label={`Quantidade de ${item.name}`} min="1" max={maxQuantity} type="number" value={item.quantity} onChange={(event) => onQuantityChange(Number(event.target.value))} />
					<button type="button" aria-label={`Aumentar quantidade de ${item.name}`} disabled={maxQuantity !== undefined && item.quantity >= maxQuantity} onClick={() => onQuantityChange(item.quantity + 1)}>+</button>
				</div>
				{maxQuantity !== undefined && <small className="bag-item-stock">{maxQuantity} disponíveis</small>}
				<strong>{formatBrl(Number(item.price) * item.quantity)}</strong>
			</div>
			<button className="bag-item-remove" type="button" onClick={onRemove}>Remover</button>
		</article>
	)
}
