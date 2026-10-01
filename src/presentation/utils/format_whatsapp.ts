export function formatWhatsapp(value: string) {
	const inputDigits = value.replace(/\D/g, '')
	const digits = inputDigits.startsWith('55') ? inputDigits.slice(2) : inputDigits
	const limitedDigits = digits.slice(0, 11)
	const areaCode = limitedDigits.slice(0, 2)
	const firstPart = limitedDigits.slice(2, 3)
	const secondPart = limitedDigits.slice(3, 7)
	const thirdPart = limitedDigits.slice(7, 11)

	if (!limitedDigits) return ''
	if (limitedDigits.length <= 2) return `+55 (${areaCode}`
	if (limitedDigits.length <= 3) return `+55 (${areaCode}) ${firstPart}`
	if (limitedDigits.length <= 7) return `+55 (${areaCode}) ${firstPart} ${secondPart}`
	return `+55 (${areaCode}) ${firstPart} ${secondPart}-${thirdPart}`
}

export function whatsappDigits(value: string) {
	return value.replace(/\D/g, '').replace(/^55/, '').slice(0, 11)
}
