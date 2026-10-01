import { useEffect, useState, type FormEvent } from 'react'
import getOfficialContacts from '../../../core/usecase/official_contact/get_official_contact'
import saveOfficialContact from '../../../core/usecase/official_contact/save_official_contact'
import type { OfficialContactInput } from '../../../core/model/official_contact'
import { formatWhatsapp, whatsappDigits } from '../../utils/format_whatsapp'
import './site_configuration.css'

const emptyContact: OfficialContactInput = {
	name: '',
	whatsapp_number: '',
	email: '',
	is_active: true,
}

export default function MyPlanContent() {
	const [contactId, setContactId] = useState<number | null>(null)
	const [form, setForm] = useState<OfficialContactInput>(emptyContact)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [feedback, setFeedback] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		getOfficialContacts()
			.then((contacts) => {
				const contact = contacts.find((item) => item.is_active) ?? contacts[0]
				if (contact) {
					setContactId(contact.id)
					setForm({ name: contact.name, whatsapp_number: formatWhatsapp(contact.whatsapp_number ?? ''), email: contact.email ?? '', is_active: true })
				}
			})
			.catch((reason: Error) => setError(reason.message))
			.finally(() => setLoading(false))
	}, [])

	function updateField(field: keyof OfficialContactInput, value: string) {
		setForm((current) => ({ ...current, [field]: value }))
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setSaving(true)
		setFeedback('')
		setError('')
		try {
			const contact = await saveOfficialContact(contactId, { ...form, whatsapp_number: whatsappDigits(form.whatsapp_number) })
			setContactId(contact.id)
			setFeedback('Configuração salva com sucesso.')
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : 'Não foi possível salvar a configuração.')
		} finally {
			setSaving(false)
		}
	}

	return (
		<div className="site-configuration">
			<p className="admin-kicker">Administração / 05</p>
			<h2>Configuração do site</h2>
			<p className="site-configuration-copy">Defina quem atende seus clientes e quais canais oficiais eles podem usar para falar com a loja.</p>
			{loading ? <p className="site-configuration-loading">Carregando configuração...</p> : (
				<form className="site-configuration-form" onSubmit={handleSubmit}>
					<label>Nome de atendimento<input required value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Nome de quem responderá" /></label>
					<label>WhatsApp<input required type="tel" value={form.whatsapp_number} onChange={(event) => updateField('whatsapp_number', formatWhatsapp(event.target.value))} placeholder="+55 (11) 9 9999-9999" /></label>
					<label>E-mail<input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="atendimento@loja.com" /></label>
					<div className="site-configuration-actions">
						{feedback && <p className="site-configuration-feedback">{feedback}</p>}
						{error && <p className="site-configuration-error">{error}</p>}
						<button className="site-configuration-button" disabled={saving} type="submit">{saving ? 'Salvando...' : 'Salvar configuração'}</button>
					</div>
				</form>
			)}
		</div>
	)
}