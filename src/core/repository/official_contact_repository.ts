import type { OfficialContact, OfficialContactInput, OfficialWhatsApp } from '../model/official_contact'

export interface OfficialContactRepository {
	getWhatsApp(): Promise<OfficialWhatsApp>
	getContacts(): Promise<OfficialContact[]>
	createContact(input: OfficialContactInput): Promise<OfficialContact>
	updateContact(id: number, input: OfficialContactInput): Promise<OfficialContact>
}
