import type { OfficialContactRepository } from '../../core/repository/official_contact_repository'
import { createOfficialContact, fetchOfficialContacts, fetchOfficialWhatsApp, updateOfficialContact } from '../api/official_contact/official_contact_api'

const officialContactRepository: OfficialContactRepository = {
	getWhatsApp: fetchOfficialWhatsApp,
	getContacts: fetchOfficialContacts,
	createContact: createOfficialContact,
	updateContact: updateOfficialContact,
}

export default officialContactRepository
