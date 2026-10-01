import { useEffect, useRef, useState, type FormEvent } from 'react'
import { navigateTo } from '../../../router'
import type { NewProduct, Product } from '../../../core/model/product'
import getProduct from '../../../core/usecase/products/get_product'
import updateProduct from '../../../core/usecase/products/update_product'
import './products_content.css'
import './admin_product_edit_page.css'

type AdminProductEditPageProps = { productId: number }

export default function AdminProductEditPage({ productId }: AdminProductEditPageProps) {
	const [product, setProduct] = useState<Product | null>(null)
	const [error, setError] = useState('')

	useEffect(() => {
		let active = true
		getProduct(productId)
			.then((result) => { if (active) setProduct(result) })
			.catch((reason: Error) => { if (active) setError(reason.message) })
		return () => { active = false }
	}, [productId])

	return (
		<div className="admin-product-edit">
			<button className="admin-product-edit-back" type="button" onClick={() => navigateTo('/admin')}>
				← Voltar para produtos
			</button>
			<div className="admin-product-edit-heading">
				<p className="admin-kicker">Catálogo / edição</p>
				<h2>{product ? product.name : 'Editar produto'}</h2>
			</div>
			{!product && !error && <div className="products-state">Carregando produto...</div>}
			{error && <div className="products-state error">{error}</div>}
			{product && <ProductEditForm product={product} onSaved={() => navigateTo('/admin')} />}
		</div>
	)
}

function ProductEditForm({ product, onSaved }: { product: Product; onSaved: () => void }) {
	const [form, setForm] = useState<NewProduct>({
		name: product.name,
		description: product.description,
		price: Number(product.price),
		stock: product.stock,
		discount: Number(product.discount),
		is_featured: product.is_featured,
	})
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState('')
	const [selectedImagePreview, setSelectedImagePreview] = useState('')
	const previewUrlRef = useRef('')

	useEffect(() => {
		return () => {
			if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
		}
	}, [])

	const imagePreview = selectedImagePreview || product.image_url

	function updateField(field: keyof NewProduct, value: string | number | boolean | File) {
		setForm((current) => ({ ...current, [field]: value }))
	}

	function handleImageChange(file: File | undefined) {
		if (!file) return
		if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
		const previewUrl = URL.createObjectURL(file)
		previewUrlRef.current = previewUrl
		setSelectedImagePreview(previewUrl)
		updateField('image', file)
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setSaving(true)
		setError('')
		try {
			await updateProduct(product.id, form)
			onSaved()
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : 'Não foi possível atualizar o produto')
		} finally {
			setSaving(false)
		}
	}

	return (
		<form className="product-form product-edit-form" onSubmit={handleSubmit}>
			<label className="product-image-field">
				Imagem do produto
				<div className="product-image-preview product-image-preview-large">
					{imagePreview ? <img src={imagePreview} alt="Pré-visualização do produto" /> : <span>Sem imagem</span>}
				</div>
				<input accept="image/jpeg,image/png,image/webp" type="file" onChange={(event) => handleImageChange(event.target.files?.[0])} />
			</label>
			<div className="product-form-fields">
				<label>Nome<input required value={form.name} onChange={(event) => updateField('name', event.target.value)} /></label>
				<label>Descrição<textarea required value={form.description} onChange={(event) => updateField('description', event.target.value)} /></label>
				<div className="product-form-row">
					<label>Preço<input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => updateField('price', Number(event.target.value))} /></label>
					<label>Estoque<input min="0" type="number" value={form.stock} onChange={(event) => updateField('stock', Number(event.target.value))} /></label>
				</div>
				<div className="product-form-row">
					<label>Desconto (%)<input min="0" max="100" step="0.01" type="number" value={form.discount} onChange={(event) => updateField('discount', Number(event.target.value))} /></label>
					<div />
				</div>
				<label className="product-form-check"><input checked={form.is_featured} type="checkbox" onChange={(event) => updateField('is_featured', event.target.checked)} />Produto em destaque</label>
			</div>
			{error && <p className="product-form-error">{error}</p>}
			<div className="product-form-actions">
				<button type="button" onClick={() => navigateTo('/admin')}>Cancelar</button>
				<button disabled={saving} type="submit">{saving ? 'Salvando...' : 'Salvar alterações'}</button>
			</div>
		</form>
	)
}