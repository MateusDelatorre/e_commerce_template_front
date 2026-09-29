export default function MainPageCarrousel() {
	return (
		<section className="hero" id="top">
			<div className="hero-copy">
				<p className="eyebrow">The art of wearing a feeling</p>
				<h1>Find your<br /><em>signature</em> scent.</h1>
				<p className="hero-description">Small-batch fragrances with a point of view. Made to linger, never to shout.</p>
				<a className="text-link" href="#highlights">Explore the collection <span>↗</span></a>
			</div>
			<div className="hero-art" aria-label="Perfume bottle on a warm stone pedestal">
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