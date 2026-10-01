import { useState } from 'react'
import UserCard from './user_card'

type AdminHeaderProps = {
	onLogout: () => void
	isDarkMode: boolean
	onThemeChange: () => void
}

export default function AdminHeader({ onLogout, isDarkMode, onThemeChange }: AdminHeaderProps) {
	const [isUserCardOpen, setIsUserCardOpen] = useState(false)

	return (
		<header className="admin-header">
			<a className="admin-brand" href="/" aria-label="Início da loja"><span className="admin-brand-mark">N</span><span>NomeLoja</span></a>
			<div className="admin-header-label">Espaço / Admin</div>
			<div className="admin-header-actions">
				<button className="admin-theme-toggle" onClick={onThemeChange} aria-label={isDarkMode ? 'Usar modo claro' : 'Usar modo escuro'}>
					<span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>{isDarkMode ? 'Claro' : 'Escuro'}
				</button>
				<button className="admin-avatar" onClick={() => setIsUserCardOpen((open) => !open)} aria-label="Abrir cartão do usuário" aria-expanded={isUserCardOpen}>A</button>
				{isUserCardOpen && <UserCard onClose={() => setIsUserCardOpen(false)} />}
				<button className="admin-logout" onClick={onLogout}>Sair</button>
			</div>
		</header>
	)
}