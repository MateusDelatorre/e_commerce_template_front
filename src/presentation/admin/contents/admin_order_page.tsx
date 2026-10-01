import { useEffect, useState } from 'react'
import { navigateTo, navigateToLogin } from '../../../router'
import type { AdminOrder, OrderStatus } from '../../../core/model/order'
import getAdminOrder from '../../../core/usecase/orders/get_admin_order'
import updateOrderStatus from '../../../core/usecase/orders/update_order_status'
import AdminHeader from '../components/admin_header'
import formatBrl from '../../utils/format_brl'
import './admin_order_page.css'

const statusLabels: Record<OrderStatus, string> = {
	pending: 'Pendente',
	processing: 'Processando',
	shipped: 'Enviado',
	delivered: 'Concluído',
	cancelled: 'Cancelado',
}

function formatDate(value: string) {
	return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(value))
}

export default function AdminOrderPage({ orderId }: { orderId: number }) {
	const [order, setOrder] = useState<AdminOrder | null>(null)
	const [loadedOrderId, setLoadedOrderId] = useState<number | null>(null)
	const [error, setError] = useState('')
	const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('admin-theme') === 'dark')
	const [updating, setUpdating] = useState(false)
	const [pendingStatus, setPendingStatus] = useState<'delivered' | 'cancelled' | null>(null)
	const loading = loadedOrderId !== orderId

	useEffect(() => {
		let active = true
		getAdminOrder(orderId)
			.then((result) => {
				if (!active) return
				setOrder(result)
				setError('')
				setLoadedOrderId(orderId)
			})
			.catch((reason: Error) => {
				if (!active) return
				setError(reason.message)
				setLoadedOrderId(orderId)
			})
		return () => { active = false }
	}, [orderId])

	async function handleStatus(status: 'delivered' | 'cancelled') {
		if (!order || updating) return
		setPendingStatus(status)
	}

	async function confirmStatusChange() {
		if (!order || !pendingStatus || updating) return
		setUpdating(true)
		setError('')
		try {
			setOrder(await updateOrderStatus(order.id, pendingStatus))
			setPendingStatus(null)
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : 'Não foi possível atualizar o pedido')
		} finally {
			setUpdating(false)
		}
	}

	return (
		<main className={isDarkMode ? 'admin-page admin-dark' : 'admin-page'}>
			<AdminHeader
				onLogout={() => { localStorage.removeItem('key'); navigateToLogin() }}
				isDarkMode={isDarkMode}
				onThemeChange={() => {
					const nextMode = !isDarkMode
					setIsDarkMode(nextMode)
					localStorage.setItem('admin-theme', nextMode ? 'dark' : 'light')
				}}
			/>
			<div className="admin-order-shell">
				<button className="admin-order-back" onClick={() => navigateTo('/admin')}>← Voltar aos pedidos</button>
				{loading && <div className="admin-order-state">Carregando pedido...</div>}
				{!loading && error && <div className="admin-order-state error">{error}</div>}
				{!loading && !error && order && <OrderDetails order={order} updating={updating} onStatusChange={handleStatus} />}
			</div>
			{pendingStatus && (
				<div className="admin-order-confirmation-backdrop" role="presentation" onMouseDown={(event) => {
					if (event.target === event.currentTarget && !updating) setPendingStatus(null)
				}}>
					<div className="admin-order-confirmation" role="dialog" aria-modal="true" aria-labelledby="admin-order-confirmation-title">
						<p className="admin-kicker">Atenção</p>
						<h2 id="admin-order-confirmation-title">{pendingStatus === 'delivered' ? 'Confirmar pedido?' : 'Cancelar pedido?'}</h2>
						<p>{pendingStatus === 'delivered' ? 'O estoque será atualizado e o pedido ficará como concluído.' : 'Esta ação marcará o pedido como cancelado.'}</p>
						<div className="admin-order-confirmation-actions">
							<button type="button" disabled={updating} onClick={() => setPendingStatus(null)}>Voltar</button>
							<button className={pendingStatus === 'delivered' ? 'admin-order-confirmation-submit' : 'admin-order-confirmation-danger'} type="button" disabled={updating} onClick={confirmStatusChange}>{updating ? 'Atualizando...' : pendingStatus === 'delivered' ? 'Confirmar pedido' : 'Cancelar pedido'}</button>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}

function OrderDetails({ order, updating, onStatusChange }: { order: AdminOrder; updating: boolean; onStatusChange: (status: 'delivered' | 'cancelled') => void }) {
	const itemCount = order.items.reduce((total, item) => total + item.quantity, 0)
	const isOpen = !['delivered', 'cancelled'].includes(order.status)
	const phone = order.user?.phone ?? order.endereco?.phone ?? 'Não informado'

	return (
		<div className="admin-order-detail">
			<div className="admin-order-detail-heading">
				<div><p className="admin-kicker">Pedido / {order.public_reference}</p><h1>Detalhes do pedido</h1><p>{formatDate(order.created_at)}</p></div>
				<span className={`order-status ${order.status}`}>{statusLabels[order.status]}</span>
			</div>
			<div className="admin-order-detail-grid">
				<section className="admin-order-panel">
					<div className="admin-order-panel-title"><h2>Itens</h2><span>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span></div>
					<div className="admin-order-items">
						{order.items.map((item) => <div className="admin-order-item" key={item.id}><span>{item.quantity}x</span><strong>{item.product?.name ?? `Produto #${item.product_id}`}</strong><b>{formatBrl(Number(item.unit_price) * item.quantity)}</b></div>)}
					</div>
				</section>
				<aside className="admin-order-panel admin-order-summary">
					<div className="admin-order-address">
						<span>Endereço escolhido</span>
						{order.endereco ? (
							<div className="admin-order-address-fields">
								<strong><b>Nome do destinatário</b>{order.endereco.receiverName}</strong>
								<strong><b>CEP</b>{order.endereco.cep}</strong>
								<strong><b>Cidade</b>{order.endereco.city} - {order.endereco.state}</strong>
								<strong><b>Nome da rua</b>{order.endereco.streetName}</strong>
								<strong><b>Número</b>{order.endereco.number}</strong>
								<strong><b>Complemento</b>{order.endereco.addressComplement || 'Não informado'}</strong>
							</div>
						) : <strong>Sem endereço</strong>}
					</div>
					<div><span>Pagamento</span><strong>{order.payment_method === 'pix' ? 'Pix' : 'Dinheiro'}</strong></div>
					<div><span>Total</span><strong>{formatBrl(order.total)}</strong></div>
				</aside>
				<section className="admin-order-panel admin-order-customer">
					<div className="admin-order-panel-title"><h2>Cliente</h2><span>Dados do pedido</span></div>
					<div className="admin-order-customer-grid">
						<div><span>Nome</span><strong>{order.user?.name ?? 'Não informado'}</strong></div>
						<div><span>Telefone</span><strong>{phone}</strong></div>
						<div><span>E-mail</span><strong>{order.user?.email ?? 'Não informado'}</strong></div>
					</div>
				</section>
			</div>
			{isOpen && <div className="admin-order-actions"><button className="admin-order-cancel" disabled={updating} onClick={() => onStatusChange('cancelled')}>Cancelar pedido</button><button className="admin-order-confirm" disabled={updating} onClick={() => onStatusChange('delivered')}>{updating ? 'Atualizando...' : 'Confirmar pedido'}</button></div>}
			{order.status === 'delivered' && <p className="admin-order-notice">Pedido concluído. Estoque atualizado.</p>}
		</div>
	)
}
