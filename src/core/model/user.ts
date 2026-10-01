export default interface UserModel {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: 'customer' | 'employee' | 'admin' | 'owner' | 'developer';
}