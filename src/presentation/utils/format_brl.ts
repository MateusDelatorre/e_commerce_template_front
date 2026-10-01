export default function formatBrl(value: number | string) {
	const amount = Number(value)
	return `${amount.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} R$`
}
