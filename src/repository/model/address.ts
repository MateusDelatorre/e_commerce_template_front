import type Address from "../../core/model/address";

export default class AddressData implements Address {
	name: string;
	receiverName: string;
	streetName: string;
	number: string;
	complement: string;
	city: string;
	country: string;
	state: string;
	cep: string;
	phone: string;

	constructor(
		name: string,
		receiverName: string,
		streetName: string,
		number: string,
		complement: string,
		city: string,
		country: string,
		state: string,
		cep: string,
		phone: string
	) {
		this.name = name;
		this.receiverName = receiverName;
		this.streetName = streetName;
		this.number = number;
		this.complement = complement;
		this.city = city;
		this.country = country;
		this.state = state;
		this.cep = cep;
		this.phone = phone;
	}

	
}