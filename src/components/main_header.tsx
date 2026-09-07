type MainHeaderProps = { onLogin: () => void}

export default function MainHeader({ onLogin }: MainHeaderProps){
	return (
		<header className="site-header">
				<a className="wordmark" href="#top" aria-label="Sillage home">NomeLoja<span>.</span></a>
				<nav className="main-nav" aria-label="Main navigation"><a href="#highlights">Destacados</a><a href="#offers">Ofertas</a><a href="#new">Novos</a></nav>
				<div className="header-actions"><button className="icon-button" aria-label="Focus search" onClick={() => document.getElementById('search')?.focus()}>⌕</button><button className="login-button" onClick={onLogin}>Log in</button><button className="bag-button" aria-label="Shopping bag">Bag <span>0</span></button></div>
			</header>
	);
}