import { apiBaseUrl } from "../../api_base";
import authServiceInstance from "../../../../presentation/auth/auth_service";

interface NewAddressEndpointProps {
	addressName: string;
	receiverName: string;
	streetName: string;
	number: string;
	addressComplement: string;
	city: string;
	state: string;
	cep: string;
	phone: string;
}

export default function NewAddressEndpoint({
	addressName,
	receiverName,
	streetName,
	number,
	addressComplement,
	city,
	state,
	cep,
	phone }: NewAddressEndpointProps){
	const body =
        `addressName=${encodeURIComponent(addressName)}` +
        `&receiverName=${encodeURIComponent(receiverName)}` +
        `&streetName=${encodeURIComponent(streetName)}` +
        `&number=${encodeURIComponent(number)}` +
        `&addressComplement=${encodeURIComponent(addressComplement)}` +
        `&city=${encodeURIComponent(city)}` +
        `&country=${encodeURIComponent("Brasil")}` +
        `&state=${encodeURIComponent(state)}` +
        `&cep=${encodeURIComponent(cep)}` +
        `&phone=${encodeURIComponent(phone)}`;
	return fetch(`${apiBaseUrl}enderecos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			"Authorization": `Bearer ${authServiceInstance.getToken()}`,
		},
		body: body
	}).then((response) => {
		return response.json().then((data) => {
			if (!response.ok) {
				console.error('New address creation failed', data)
				throw new Error(data.message ?? 'New address creation failed')
			}
			return true
		})
	})
}