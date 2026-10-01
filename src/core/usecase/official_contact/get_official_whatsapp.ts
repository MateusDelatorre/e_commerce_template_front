import officialContactRepository from '../../../repository/official_contact/official_contact_repository'

export default function getOfficialWhatsApp() {
	return officialContactRepository.getWhatsApp()
}