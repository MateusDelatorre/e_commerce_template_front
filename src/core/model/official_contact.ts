export type OfficialContact = {
	id: number
	name: string
	whatsapp_number: string | null
	email: string | null
	is_active: boolean
}

export type OfficialWhatsApp = Pick<OfficialContact, 'name' | 'whatsapp_number'>

export type OfficialContactInput = {
	name: string
	whatsapp_number: string
	email: string
	is_active: boolean
}
