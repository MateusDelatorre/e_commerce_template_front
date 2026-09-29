import { useState } from 'react'

type Order = { number: string; product: string; status: string; purchaseDate: string; value: string }

export default function OrdersContent() {
	const [openOrder, setOpenOrder] = useState<string | null>(null)
	const orders: Order[] = [
		{ number: '#SL-2048', product: 'Santal 33', status: 'In transit', purchaseDate: '12 Sep 2026', value: '$185.00' },
		{ number: '#SL-1982', product: 'Fleur de Peau', status: 'Delivered', purchaseDate: '28 Aug 2026', value: '$142.00' },
		{ number: '#SL-1874', product: 'Thé Noir 29', status: 'Delivered', purchaseDate: '04 Jul 2026', value: '$165.00' },
	]
	return (
		<section className="account-content orders-content">
			<p className="eyebrow">Collection / 03</p><h2>Your orders</h2>
			<p className="content-intro">A trace of every fragrance that found its way to you.</p>
			<div className="orders-list">{orders.map((order) => <article className={openOrder === order.number ? 'order-card open' : 'order-card'} key={order.number}>
				<button className="order-summary" onClick={() => setOpenOrder(openOrder === order.number ? null : order.number)} aria-expanded={openOrder === order.number}><span><small>{order.number}</small><strong>{order.product}</strong></span><b>{openOrder === order.number ? '−' : '+'}</b></button>
				{openOrder === order.number && <div className="order-details"><div><small>Status</small><strong>{order.status}</strong></div><div><small>Purchase date</small><strong>{order.purchaseDate}</strong></div><div><small>Value</small><strong>{order.value}</strong></div></div>}
			</article>)}</div>
		</section>
	)
}