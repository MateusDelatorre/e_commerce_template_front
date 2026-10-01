export default function MainPageCarrousel() {
	return (
		<section className="hero" id="top">
			<div className="hero-copy">
				<p className="eyebrow">A arte de vestir uma sensação</p>
				<h1>Encontre sua<br /><em>fragrância</em> marcante.</h1>
				<p className="hero-description">Fragrâncias artesanais com personalidade. Feitas para permanecer, nunca para chamar atenção.</p>
				<a className="text-link" href="#highlights">Explorar coleção <span>↗</span></a>
			</div>
			<div className="hero-art" aria-label="Frasco de perfume sobre pedestal de pedra aquecido">
				<div className="sun-disc" />
				<div className="bottle-shadow" />
				<div className="perfume-bottle">
					<div className="bottle-cap" />
					<div className="bottle-label">SILLAGE<br /><strong>NO. 04</strong></div>
				</div>
				<div className="pedestal" />
				<p className="hero-note">ESSENTIALS / 04</p>
			</div>
		</section>
	)
}