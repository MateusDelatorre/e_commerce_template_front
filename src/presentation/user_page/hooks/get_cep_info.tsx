export type CepInfo = {
	cep?: string;
	logradouro?: string;
	complemento?: string;
	bairro?: string;
	localidade?: string;
	uf?: string;
	ibge?: string;
	gia?: string;
	ddd?: string;
	siafi?: string;
	erro?: boolean;
};

export default async function getCepInfo(cep: string): Promise<CepInfo> {
	const normalizedCep = cep.replace(/\D/g, "");

	if (!normalizedCep || normalizedCep.length !== 8) {
		throw new Error("CEP inválido. Informe 8 dígitos.");
	}

	const response = await fetch(`https://viacep.com.br/ws/${normalizedCep}/json/`);

	if (!response.ok) {
		throw new Error("Falha ao buscar o CEP.");
	}

	const data: CepInfo = await response.json();

	if (data.erro) {
		throw new Error("CEP não encontrado.");
	}

	return data;
}
