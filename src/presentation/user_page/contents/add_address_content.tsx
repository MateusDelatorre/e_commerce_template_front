import { useState } from "react";
import CepInput from "../components/cep_input"
import LabelInput from "../../components/label_input";
import getCepInfo from "../hooks/get_cep_info";
import NewAddressEndpoint from "../../../api/user_endpoints/address_endpoints/new_address";

export default function AddAddressContent({ onBack }: { onBack: () => void }) {
	const [addressName, setAddressName] = useState("");
	const [receiverName, setReceiverName] = useState("");
	const [streetName, setStreetName] = useState("");
	const [number, setNumber] = useState("");
	const [addressComplement, setAddressComplement] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [cep, setCep] = useState("");
	const [phone, setPhone] = useState("");
	const [is_loading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function handleCEP(event: React.FocusEvent<HTMLInputElement>) {
		const typedCep = event.target.value;
		const cleanedCep = typedCep.replace(/\D/g, "");

		setCep(cleanedCep);
		setError(null);

		if (cleanedCep.length !== 8) {
			setError("CEP inválido. Informe 8 dígitos.");
			return;
		}

		getCepInfo(cleanedCep)
			.then((data) => {
				setStreetName(data.logradouro ?? "");
				setCity(data.localidade ?? "");
				setState(data.uf ?? "");
				setError(null);
			})
			.catch((err) => {
				setError(err instanceof Error ? err.message : "Erro ao buscar CEP.");
				setStreetName("");
				setAddressComplement("");
				setCity("");
				setState("");
			});
	}

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		if (is_loading) return;

		setIsLoading(true);
		setError(null);

		try {
			await NewAddressEndpoint({
				addressName,
				receiverName,
				streetName,
				number,
				addressComplement,
				city,
				state,
				cep,
				phone,
			});
			onBack();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao salvar endereço.");
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<section className="account-content">
			<button className="back-link" onClick={onBack}>← Voltar</button>
			<h2>Novo Endereço</h2>
			{error && <p className="error-message">{error}</p>}
			<form className="account-form" onSubmit={handleSubmit}>
				<LabelInput 
					label="Nome do Endereço" 
					placeholder="Casa, Trabalho..." 
					type="text" 
					value={addressName}
					onChange={(value) => setAddressName(value)} />
				<LabelInput 
					label="Nome do Destinatário" 
					placeholder="Nome de quem vai receber" 
					type="text" 
					value={receiverName}
					onChange={(value) => setReceiverName(value)} />
				<LabelInput
					label="Telefone"
					placeholder="(11) 99999-9999"
					type="tel"
					value={phone}
					onChange={(value) => setPhone(value)} />
				<CepInput onBlur={handleCEP} />
				<LabelInput 
					label="Cidade" 
					placeholder="Cidade" 
					type="text" 
					value={city}
					onChange={(value) => setCity(value)}
				/>
				<LabelInput 
					label="Nome da Rua" 
					placeholder="Nome da rua" 
					type="text" 
					value={streetName}
					onChange={(value) => setStreetName(value)} />
				<div className="form-row">
					<LabelInput 
						label="Número" 
						placeholder="23" 
						type="text" 
						value={number}
						onChange={(value) => setNumber(value)} />
					<LabelInput 
						label="Complemento" 
						placeholder="Apto 4 Bloco C" 
						type="text" 
						value={addressComplement}
						onChange={(value) => setAddressComplement(value)} />
				</div>
				<button className="dark-button" type="submit" disabled={is_loading}>
					{is_loading ? "Salvando..." : "Salvar Endereço"}<span>↗</span>
				</button>
			</form>
		</section>
	)
}