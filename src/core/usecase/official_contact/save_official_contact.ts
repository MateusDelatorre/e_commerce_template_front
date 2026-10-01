import officialContactRepository from '../../../repository/official_contact/official_contact_repository'
import type { OfficialContactInput } from '../../model/official_contact'

export default function saveOfficialContact(id: number | null, input: OfficialContactInput) {
	return id === null ? officialContactRepository.createContact(input) : officialContactRepository.updateContact(id, input)
}
