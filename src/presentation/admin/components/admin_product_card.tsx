import type { Product } from '../../../core/model/product'
import formatBrl from '../../utils/format_brl'
import './admin_product_card.css'

type AdminProductCardProps = {
	product: Product
	onSelect: (product: Product) => void
}

export default function AdminProductCard({ product, onSelect }: AdminProductCardProps) {
	const price = Number(product.price)
	const discount = Number(product.discount)

	return (
		<article
			className="admin-product-card"
			role="button"
			tabIndex={0}
			onClick={() => onSelect(product)}
			onKeyDown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') onSelect(product)
			}}
		>
			<div className="admin-product-card-image">
				{product.image_url ? <img src={product.image_url} alt={product.name} /> : <span aria-hidden="true">N°</span>}
				{discount > 0 && <small>{discount}% de desconto</small>}
			</div>
			<div className="admin-product-card-body">
				<div className="admin-product-card-heading">
					<div><p>{product.is_featured ? 'Destaque' : 'Catálogo'}</p><h3>{product.name}</h3></div>
					<strong>{formatBrl(price)}</strong>
				</div>
				<div className="admin-product-card-meta"><span>{product.stock} em estoque</span><span>{product.total_sold ?? 0} vendidos</span></div>
			</div>
		</article>
	)
}
