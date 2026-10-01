import { useEffect, useRef, useState, type FormEvent } from 'react'
import createProduct from '../../../core/usecase/products/create_product'
import getProducts from '../../../core/usecase/products/get_products'
import type { NewProduct, Product, ProductPage } from '../../../core/model/product'
import AdminProductCard from '../components/admin_product_card'
import { navigateTo } from '../../../router'
import './products_content.css'

const emptyForm: NewProduct = {
	name: '',
	description: '',
	price: 0,
	stock: 0,
	discount: 0,
	is_featured: false,
}

type ProductsContentProps = {
	onSelectProduct?: (productId: number) => void
}

export default function ProductsContent({ onSelectProduct }: ProductsContentProps) {
	const [page, setPage] = useState(1)
	const [productPage, setProductPage] = useState<ProductPage | null>(null)
	const [loadedPage, setLoadedPage] = useState<number | null>(null)
	const [error, setError] = useState('')
	const [isFormOpen, setIsFormOpen] = useState(false)
	const loading = loadedPage !== page

	useEffect(() => {
		let active = true
		getProducts(page)
			.then((result) => {
				if (!active) return
				setProductPage(result)
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

	function handleCreated() {
		setIsFormOpen(false)
		setPage(1)
		if (page === 1) {
			getProducts(1).then(setProductPage).catch((reason: Error) => setError(reason.message))
		}
	}

	return (
		<div className="products-content">
			<div className="products-heading">
				<div>
					<p className="admin-kicker">Catálogo / 02</p>
					<h2>Produtos</h2>
					<p className="products-heading-copy">Mantenha seu catálogo claro, atualizado e pronto para o próximo pedido.</p>
				</div>
				<button
					className="products-primary-button"
					onClick={() => setIsFormOpen(true)}
				>
					+ Novo produto
				</button>
			</div>

			{loading && (
				<div className="products-state">
					Carregando produtos...
				</div>
			)}
			{!loading && error && (
				<div className="products-state error">
					{error}
				</div>
			)}
			{!loading && !error && productPage && !productPage.data.length && (
				<div className="products-state">
					Nenhum produto encontrado.
				</div>
			)}
			{!loading && !error && productPage && productPage.data.length > 0 && (
				<>
					<div className="products-grid">
						{productPage.data.map((product: Product) => (
							<AdminProductCard
								key={product.id}
								product={product}
								onSelect={(selectedProduct) => {
									if (onSelectProduct) onSelectProduct(selectedProduct.id)
									else navigateTo(`/admin/products/${selectedProduct.id}`)
								}}
							/>
						))}
					</div>
				<div className="products-pagination">
					<button
						className="products-page-button"
						disabled={productPage.current_page <= 1}
						onClick={() => setPage((current) => current - 1)}
					>
						Anterior
					</button>
					<span>
						Página {productPage.current_page} de {productPage.last_page}
					</span>
					<button
						className="products-page-button"
						disabled={productPage.current_page >= productPage.last_page}
						onClick={() => setPage((current) => current + 1)}
					>
						Próxima
					</button>
				</div>
				</>
			)}

			{isFormOpen && (
				<ProductForm
					onClose={() => setIsFormOpen(false)}
					onCreated={handleCreated}
				/>
			)}
		</div>
	)
}

function ProductForm({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
	const [form, setForm] = useState<NewProduct>(emptyForm)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState('')
	const [imagePreview, setImagePreview] = useState('')
	const previewUrlRef = useRef('')

	useEffect(() => {
		return () => {
			if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
		}
	}, [])

	function updateField(field: keyof NewProduct, value: string | number | boolean | File) {
		setForm((current) => ({ ...current, [field]: value }))
	}

	function handleImageChange(file: File | undefined) {
		if (!file) return
		if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
		const previewUrl = URL.createObjectURL(file)
		previewUrlRef.current = previewUrl
		setImagePreview(previewUrl)
		updateField('image', file)
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setSaving(true)
		setError('')
		try {
			await createProduct(form)
			onCreated()
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : 'Unable to create product')
		} finally {
			setSaving(false)
		}
	}

	return (
		<div
			className="product-form-backdrop"
			role="presentation"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) onClose()
			}}
		>
			<form className="product-form" onSubmit={handleSubmit}>
				<div className="product-form-header">
					<div>
						<p className="admin-kicker">Catálogo</p>
							<h3>Novo produto</h3>
					</div>
					<button
						type="button"
						className="product-form-close"
						onClick={onClose}
						aria-label="Fechar"
					>
						×
					</button>
				</div>
				<label className="product-image-field">
					Imagem do produto
					<div className="product-image-preview product-image-preview-large">
						{imagePreview ? <img src={imagePreview} alt="Pré-visualização do produto" /> : <span>Nenhuma imagem selecionada</span>}
					</div>
					<input accept="image/jpeg,image/png,image/webp" type="file" onChange={(event) => handleImageChange(event.target.files?.[0])} />
				</label>
				<div className="product-form-fields">
					<label>
						Nome
						<input
							required
							value={form.name}
							onChange={(event) => updateField('name', event.target.value)}
						/>
					</label>
					<label>
						Descrição
						<textarea
							required
							value={form.description}
							onChange={(event) => updateField('description', event.target.value)}
						/>
					</label>
					<div className="product-form-row">
						<label>
							Preço
							<input
								required
								min="0"
								step="0.01"
								type="number"
								value={form.price}
								onChange={(event) => updateField('price', Number(event.target.value))}
							/>
						</label>
						<label>
							Estoque
							<input
								min="0"
								type="number"
								value={form.stock}
								onChange={(event) => updateField('stock', Number(event.target.value))}
							/>
						</label>
					</div>
					<div className="product-form-row">
						<label>
							Desconto (%)
							<input
								min="0"
								max="100"
								step="0.01"
								type="number"
								value={form.discount}
								onChange={(event) => updateField('discount', Number(event.target.value))}
							/>
						</label>
						<div />
					</div>
					<label className="product-form-check">
						<input
							checked={form.is_featured}
							type="checkbox"
							onChange={(event) => updateField('is_featured', event.target.checked)}
						/>
						Produto em destaque
					</label>
				</div>
				{error && (
					<p className="product-form-error">
						{error}
					</p>
				)}
				<div className="product-form-actions">
					<button
						type="button"
						onClick={onClose}
					>
						Cancelar
					</button>
					<button
						disabled={saving}
						type="submit"
					>
						{saving ? 'Criando...' : 'Criar produto'}
					</button>
				</div>
			</form>
		</div>
	)
}