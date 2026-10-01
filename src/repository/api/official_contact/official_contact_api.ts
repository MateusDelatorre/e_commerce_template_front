import authServiceInstance from '../../../presentation/auth/auth_service'
import type { OfficialContact, OfficialContactInput, OfficialWhatsApp } from '../../../core/model/official_contact'
import { apiBaseUrl } from '../api_base'

async function parseResponse<T>(response: Response, fallback: string): Promise<T> {
	const data = await response.json().catch(() => null)
	if (!response.ok) {
		const message = typeof data?.message === 'string' ? data.message : typeof data?.error === 'string' ? data.error : fallback
		throw new Error(message)
	}
	return (data?.contact ?? data) as T
}

function headers() {
	return {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${authServiceInstance.getToken()}`,
	}
}

export async function fetchOfficialContacts(): Promise<OfficialContact[]> {
	const response = await fetch(`${apiBaseUrl}official-contacts`, { headers: headers() })
	return parseResponse<OfficialContact[]>(response, 'Não foi possível carregar o contato oficial')
}

export async function fetchOfficialWhatsApp(): Promise<OfficialWhatsApp> {
	const response = await fetch(`${apiBaseUrl}contact/whatsapp`, { headers: { Accept: 'application/json' } })
	return parseResponse<OfficialWhatsApp>(response, 'Não foi possível carregar o WhatsApp da loja')
}

export async function createOfficialContact(input: OfficialContactInput): Promise<OfficialContact> {
	const response = await fetch(`${apiBaseUrl}official-contacts`, { method: 'POST', headers: headers(), body: JSON.stringify(input) })
	return parseResponse<OfficialContact>(response, 'Não foi possível salvar o contato oficial')
}

export async function updateOfficialContact(id: number, input: OfficialContactInput): Promise<OfficialContact> {
	const response = await fetch(`${apiBaseUrl}official-contacts/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(input) })
	return parseResponse<OfficialContact>(response, 'Não foi possível atualizar o contato oficial')
}
