interface EspecialOfferSectionProps {
	navigateToRegister: () => void
}

export default function EspecialOfferSection(EspecialOfferSectionProps: EspecialOfferSectionProps) {
	return (
		<section className="offer-band" id="offers">
				<div>
					<p className="eyebrow">Um toque a mais</p>
					<h2>Mais aroma,<br /><em>menos hesitação.</em></h2>
				</div>
				<p>Descubra algo novo com 15% de desconto no primeiro pedido. Sua próxima fragrância marcante está mais perto do que imagina.</p>
				<button className="dark-button" onClick={EspecialOfferSectionProps.navigateToRegister}>Aproveitar oferta de boas-vindas <span>↗</span></button>
			</section>
	)
}