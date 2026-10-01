import { useEffect, useState } from 'react'
import type { AdminOrder, OrderStatus } from '../../../core/model/order'
import getMyOrders from '../../../core/usecase/orders/get_my_orders'
import formatBrl from '../../utils/format_brl'

export default function OrdersContent() {
	const [openOrder, setOpenOrder] = useState<number | null>(null)
	const [orders, setOrders] = useState<AdminOrder[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		getMyOrders()
			.then((result) => setOrders(result.data))
			.catch((reason: Error) => setError(reason.message))
			.finally(() => setLoading(false))
	}, [])

	return (
		<section className="account-content orders-content">
			<p className="eyebrow">Coleção / 03</p><h2>Seus pedidos</h2>
			<p className="content-intro">O registro de cada fragrância que chegou até você.</p>
			{loading && <p className="orders-state">Carregando pedidos...</p>}
			{!loading && error && <p className="orders-state error">{error}</p>}
			{!loading && !error && !orders.length && <p className="orders-state">Sem pedidos.</p>}
			{!loading && !error && orders.length > 0 && <div className="orders-list">{orders.map((order) => {
				const firstProduct = order.items[0]?.product?.name ?? 'Pedido'
				const productLabel = order.items.length > 1 ? `${firstProduct} + ${order.items.length - 1} item(ns)` : firstProduct
				return <article className={openOrder === order.id ? 'order-card open' : 'order-card'} key={order.id}>
					<button className="order-summary" onClick={() => setOpenOrder(openOrder === order.id ? null : order.id)} aria-expanded={openOrder === order.id}><span><small>Pedido {order.public_reference}</small><strong>{productLabel}</strong></span><b>{openOrder === order.id ? '−' : '+'}</b></button>
					{openOrder === order.id && <div className="order-details"><div><small>Status</small><strong>{getStatusLabel(order.status)}</strong></div><div><small>Data da compra</small><strong>{formatOrderDate(order.created_at)}</strong></div><div><small>Valor</small><strong>{formatBrl(order.total)}</strong></div></div>}
				</article>
			})}</div>}
		</section>
	)
}

function getStatusLabel(status: OrderStatus) {
	return { pending: 'Pendente', processing: 'Em processamento', shipped: 'Enviado', delivered: 'Entregue', cancelled: 'Cancelado' }[status]
}

function formatOrderDate(value: string) {
	return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}