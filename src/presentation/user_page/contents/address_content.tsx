import { useEffect, useState } from "react";
import getAddress from "../../../api/user_endpoints/address_endpoints/get_address";
import type Address from "../../../core/model/address";

export default function AddressContent({ onAddAddress }: { onAddAddress: () => void }) {
	const [addresses, setAddresses] = useState<Address[]>([])
	useEffect(() => {
		getAddress().then((data) => {
			setAddresses(data);
		}).catch(() => {
			setAddresses([]);
		});
	}, [])

	return (
		<section className="account-content">
			<p className="eyebrow">Delivery / 02</p><h2>Your addresses</h2>
			<p className="content-intro">A beautiful scent should arrive exactly where you are.</p>
			<div className="address-grid">
				{addresses.map((address) => <AddressCard address={address} key={address.name} />)}
				<button className="add-address-card" onClick={onAddAddress} aria-label="Add address"><span>+</span><strong>Add address</strong></button>
			</div>
		</section>
	)
}

function AddressCard({ address }: { address: Address }) {
	return (
		<article className="address-card">
			<span className="card-kicker">Endereço</span>
			<h3>{address.name}</h3>
			<p>{address.streetName}</p>
			<button aria-label={`Edit ${address.name} address`}>Edit ↗</button>
		</article>
	)
}