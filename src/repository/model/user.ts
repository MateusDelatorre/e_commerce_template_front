import type UserModel from "../../core/model/user";

export default class UserData implements UserModel {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: UserModel['role'];

	constructor(
		id: string,
		name: string,
		email: string,
		phone: string,
		role: UserModel['role']
	) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.role = role;
	}
}
