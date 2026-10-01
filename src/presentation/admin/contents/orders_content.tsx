import { useEffect, useState } from 'react'
import getAdminOrders from '../../../core/usecase/orders/get_admin_orders'
import type { AdminOrder, AdminOrderPage, OrderStatus } from '../../../core/model/order'
import formatBrl from '../../utils/format_brl'
import './orders_content.css'

const statusLabels: Record<OrderStatus, string> = {
	pending: 'Pendente',
	processing: 'Processando',
	shipped: 'Enviado',
	delivered: 'Entregue',
	cancelled: 'Cancelado',
}

function formatOrderDate(value: string) {
	return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(value))
}

function paymentLabel(paymentMethod: AdminOrder['payment_method']) {
	return paymentMethod === 'pix' ? 'Pix' : 'Dinheiro'
}

export default function OrdersContent() {
	const [page, setPage] = useState(1)
	const [orderPage, setOrderPage] = useState<AdminOrderPage | null>(null)
	const [loadedPage, setLoadedPage] = useState<number | null>(null)
	const [error, setError] = useState('')
	const loading = loadedPage !== page

	useEffect(() => {
		let active = true
		getAdminOrders(page)
			.then((result) => {
				if (!active) return
				setOrderPage(result)
				setError('')
				setLoadedPage(page)
			})
			.catch((reason: Error) => {
				if (!active) return
				setError(reason.message)
				setLoadedPage(page)
			})
		return () => { active = false }
	}, [page])

	return (
		<div className="orders-content">
			<div className="orders-heading">
				<div>
					<p className="admin-kicker">Operações / 03</p>
					<h2>Pedidos</h2>
					<p className="orders-heading-copy">Acompanhe pedidos, pagamentos e entregas em um só lugar.</p>
				</div>
			</div>

			{loading && <div className="orders-state">Carregando pedidos...</div>}
			{!loading && error && <div className="orders-state error">{error}</div>}
			{!loading && !error && orderPage && !orderPage.data.length && <div className="orders-state">Nenhum pedido encontrado.</div>}
			{!loading && !error && orderPage && orderPage.data.length > 0 && (
				<>
							<div className="orders-list">
								{orderPage.data.map((order) => <OrderRow key={order.id} order={order} />)}
					</div>
					<div className="orders-pagination">
						<button className="orders-page-button" disabled={orderPage.current_page <= 1} onClick={() => setPage((current) => current - 1)}>Anterior</button>
						<span>Página {orderPage.current_page} de {orderPage.last_page}</span>
						<button className="orders-page-button" disabled={orderPage.current_page >= orderPage.last_page} onClick={() => setPage((current) => current + 1)}>Próxima</button>
					</div>
				</>
			)}
		</div>
	)
}

function OrderRow({ order }: { order: AdminOrder }) {
	const itemCount = order.items.reduce((total, item) => total + item.quantity, 0)
	const address = order.endereco ? `${order.endereco.city} - ${order.endereco.state}` : 'Sem endereço'

	return (
		<a className="order-row-link" href={`/admin/orders/${order.id}`}>
		<article className="order-row">
			<span>{order.public_reference}</span>
			<div className="order-row-main">
				<strong>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</strong>
				<small>{formatOrderDate(order.created_at)}</small>
			</div>
			<div className="order-row-detail">
				<span>Entrega</span>
				<strong>{address}</strong>
				<small>{paymentLabel(order.payment_method)}</small>
			</div>
			<div className={`order-status ${order.status}`}>{statusLabels[order.status]}</div>
			<div className="order-row-total">
				<span>Total</span>
				<strong>{formatBrl(order.total)}</strong>
			</div>
		</article>
		</a>
	)
}