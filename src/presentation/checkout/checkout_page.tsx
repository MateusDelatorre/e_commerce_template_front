import { useEffect, useMemo, useState } from 'react'
import { navigateToHome, navigateToLogin } from '../../router'
import type { CheckoutAddress, PaymentMethod, PlacedOrder } from '../../core/model/checkout'
import getCheckoutAddresses from '../../core/usecase/checkout/get_checkout_addresses'
import placeOrder from '../../core/usecase/checkout/place_order'
import clearBag from '../../core/usecase/bag/clear_bag'
import getBagItems from '../../core/usecase/bag/get_bag_items'
import type { BagItem } from '../../core/model/bag'
import type UserModel from '../../core/model/user'
import getUserData from '../../repository/api/user_endpoints/get_user_data'
import getOfficialWhatsApp from '../../core/usecase/official_contact/get_official_whatsapp'
import MainHeader from '../components/main_header'
import AddAddressContent from '../user_page/contents/add_address_content'
import formatBrl from '../utils/format_brl'
import { formatWhatsapp } from '../utils/format_whatsapp'
import './checkout_page.css'

export default function CheckoutPage() {
	const [items] = useState<BagItem[]>(getBagItems)
	const [addresses, setAddresses] = useState<CheckoutAddress[]>([])
	const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix')
	const [isAddingAddress, setIsAddingAddress] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const [order, setOrder] = useState<PlacedOrder | null>(null)
	const [customer, setCustomer] = useState<UserModel | null>(null)
	const [whatsappError, setWhatsappError] = useState('')

	function loadAddresses() {
		getCheckoutAddresses()
			.then((result) => {
				setAddresses(result)
				setSelectedAddressId((current) => current ?? result[0]?.id ?? null)
			})
			.catch((reason: Error) => setError(reason.message))
	}

	useEffect(() => {
		loadAddresses()
		getUserData().then(setCustomer).catch(() => undefined)
	}, [])

	const total = useMemo(() => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [items])

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (!selectedAddressId) {
			setError('Escolha um endereço de entrega.')
			return
		}
		if (!items.length) {
			setError('Sua sacola está vazia.')
			return
		}

		setIsSubmitting(true)
		setError('')
		const whatsappWindow = window.open('', '_blank')
		try {
			const createdOrder = await placeOrder({
				endereco_id: selectedAddressId,
				payment_method: paymentMethod,
				items: items.map((item) => ({ product_id: item.productId, quantity: item.quantity })),
			})
			clearBag()
			setOrder(createdOrder)
			void redirectToWhatsApp(createdOrder, whatsappWindow)
		} catch (reason) {
			whatsappWindow?.close()
			setError(reason instanceof Error ? reason.message : 'Não foi possível finalizar o pedido.')
		} finally {
			setIsSubmitting(false)
		}
	}

	async function handleWhatsAppClick() {
		if (!order) return
		const popup = window.open('', '_blank')
		if (!popup) {
			setWhatsappError('Permita pop-ups para abrir o WhatsApp da loja.')
			return
		}

		try {
			popup.location.href = await getWhatsAppUrl(order)
		} catch (reason) {
			popup.close()
			setWhatsappError(reason instanceof Error ? reason.message : 'Não foi possível abrir o WhatsApp da loja.')
		}
	}

	async function redirectToWhatsApp(targetOrder: PlacedOrder, targetWindow: Window | null) {
		try {
			const destination = targetWindow ?? window
			destination.location.href = await getWhatsAppUrl(targetOrder)
		} catch (reason) {
			targetWindow?.close()
			setWhatsappError(reason instanceof Error ? reason.message : 'Não foi possível abrir o WhatsApp da loja.')
		}
	}

	async function getWhatsAppUrl(targetOrder: PlacedOrder) {
		const selectedAddress = addresses.find((address) => address.id === selectedAddressId)
		if (!selectedAddress) throw new Error('Não foi possível carregar o endereço do pedido.')
		const [officialWhatsApp, currentCustomer] = await Promise.all([
			getOfficialWhatsApp(),
			customer ? Promise.resolve(customer) : getUserData(),
		])
		if (!officialWhatsApp.whatsapp_number) throw new Error('WhatsApp da loja não configurado.')
		const message = buildOrderMessage(currentCustomer, selectedAddress, items, targetOrder)
		const cleanPhone = officialWhatsApp.whatsapp_number.replace(/\D/g, '')
		return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
	}

	return (
		<main className="checkout-page">
			<MainHeader onLogin={navigateToLogin} />
			{isAddingAddress ? (
				<AddAddressContent onBack={() => { setIsAddingAddress(false); loadAddresses() }} />
			) : order ? (
				<div className="checkout-success">
					<p className="eyebrow">Pedido confirmado</p>
					<h1>Obrigado<br /><em>pela escolha.</em></h1>
					<p>Pedido {order.public_reference} recebido. Vamos cuidar de cada detalhe.</p>
					<p className="checkout-whatsapp-instruction">Para concluir seu pedido, você precisa enviá-lo pelo WhatsApp da loja.</p>
					<button className="checkout-whatsapp" type="button" onClick={handleWhatsAppClick}>Enviar pedido pelo WhatsApp <span>↗</span></button>
					{whatsappError && <p className="checkout-error">{whatsappError}</p>}
					<a className="checkout-link" href="/" onClick={(event) => { event.preventDefault(); navigateToHome() }}>Voltar à loja <span>↗</span></a>
				</div>
			) : (
				<div className="checkout-shell">
					<div className="checkout-heading">
						<p className="eyebrow">Última etapa</p>
						<h1>Finalizar<br /><em>pedido.</em></h1>
					</div>
					<form className="checkout-form" onSubmit={handleSubmit}>
						<section className="checkout-section">
							<div className="checkout-section-heading"><span>01</span><div><h2>Endereço de entrega</h2><p>Escolha onde seu pedido deve chegar.</p></div></div>
							<div className="checkout-addresses">
								{addresses.map((address) => (
									<label className={selectedAddressId === address.id ? 'checkout-address selected' : 'checkout-address'} key={address.id}>
										<input type="radio" name="address" checked={selectedAddressId === address.id} onChange={() => setSelectedAddressId(address.id)} />
										<span><strong>{address.addressName}</strong><small>{address.streetName}, {address.city} - {address.state}</small></span>
									</label>
								))}
								<button className="checkout-add-address" type="button" onClick={() => setIsAddingAddress(true)}>+ Cadastrar novo endereço</button>
							</div>
						</section>

						<section className="checkout-section">
							<div className="checkout-section-heading"><span>02</span><div><h2>Forma de pagamento</h2><p>Escolha como deseja pagar.</p></div></div>
							<div className="checkout-payments">
								<label className={paymentMethod === 'pix' ? 'checkout-payment selected' : 'checkout-payment'}><input type="radio" name="payment" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} /><span><strong>Pix</strong><small>Pagamento instantâneo</small></span></label>
								<label className={paymentMethod === 'cash' ? 'checkout-payment selected' : 'checkout-payment'}><input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} /><span><strong>Dinheiro</strong><small>Pagamento na entrega</small></span></label>
							</div>
						</section>

						<section className="checkout-review">
							<div><span>Total do pedido</span><strong>{formatBrl(total)}</strong></div>
							<button className="checkout-submit" disabled={isSubmitting || !items.length} type="submit">{isSubmitting ? 'Finalizando...' : 'Finalizar pedido'} <span>↗</span></button>
						</section>
						{error && <p className="checkout-error">{error}</p>}
					</form>
				</div>
			)}
		</main>
	)
}

function buildOrderMessage(customer: UserModel, address: CheckoutAddress, items: BagItem[], order: PlacedOrder) {
	const addressLine = [address.streetName, address.number].filter(Boolean).join(', ')
	const complement = address.addressComplement ? ` - ${address.addressComplement}` : ''
	const itemLines = items.map((item) => {
		const itemTotal = Number(item.price) * item.quantity
		return `${item.quantity}x ${item.name}\nUnit.: ${formatBrl(item.price)} | Total: ${formatBrl(itemTotal)}`
	}).join('\n\n')

	return `Olá, ${customer.name}!\n\nRecebemos seu pedido ${order.public_reference}. ✅\n\nNome: ${customer.name}\nWhatsApp: ${formatWhatsapp(customer.phone)}\nE-mail: ${customer.email}\n${address.receiverName ? `Recebedor: ${address.receiverName}\n` : ''}Endereço: ${addressLine}${complement}\nCEP: ${address.cep ?? 'Não informado'}\nCidade: ${address.city} - ${address.state}\nForma de Pagamento: ${order.payment_method === 'pix' ? 'PIX' : 'Dinheiro'}\n\n📦 Produtos:\n${itemLines}\n\nTotal: ${formatBrl(order.total)}\n\nObrigado!`
}
