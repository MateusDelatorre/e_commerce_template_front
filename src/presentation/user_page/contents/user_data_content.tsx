import { useEffect, useState } from "react"
import LabelInput from "../../components/label_input"
import getUserData from "../../../api/user_endpoints/get_user_data";
import UserDataContentHeader from "../components/user_data_content_header";

export default function UserDataContent() {
	const [name, setName] = useState("teste");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [is_loading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserData().then((data) => {
			setName(data.name);
			setPhone(data.number);
			setEmail(data.email);
			setIsLoading(false);
		});
	}, [])

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		// Handle form submission logic here

	}

	if (is_loading) {
		return (
			<section className="account-content">
				<UserDataContentHeader />
			</section>
		)
	}else{
		return (
			<section className="account-content">
				<p className="eyebrow">Profile / 01</p><h2>Your details</h2>
				<p className="content-intro">Keep your details current for a smoother, more personal Sillage experience.</p>
				<form className="account-form" onSubmit={handleSubmit}>
					<LabelInput 
						label="Name"
						type="text"
						placeholder=""
						value={name}
						onChange={(value) => setName(value)} />
					<LabelInput 
						label="Phone number"
						type="text"
						placeholder=""
						value={phone}
						onChange={(e) => setPhone(e)} />
					<LabelInput 
						label="Email"
						type="text"
						placeholder=""
						value={email}
						onChange={(e) => setEmail(e)} />
					<button className="dark-button" type="submit" disabled={is_loading}>
					{is_loading ? "Salvando..." : "Salvar Endereço"}<span>↗</span></button>
				</form>
			</section>
		)
	}
}