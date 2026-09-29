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
			<a className="admin-brand" href="/" aria-label="Store home"><span className="admin-brand-mark">N</span><span>NomeLoja</span></a>
			<div className="admin-header-label">Workspace / Admin</div>
			<div className="admin-header-actions">
				<button className="admin-theme-toggle" onClick={onThemeChange} aria-label={isDarkMode ? 'Use light mode' : 'Use dark mode'}>
					<span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>{isDarkMode ? 'Light' : 'Dark'}
				</button>
				<button className="admin-avatar" onClick={() => setIsUserCardOpen((open) => !open)} aria-label="Open user card" aria-expanded={isUserCardOpen}>A</button>
				{isUserCardOpen && <UserCard onClose={() => setIsUserCardOpen(false)} />}
				<button className="admin-logout" onClick={onLogout}>Log out</button>
			</div>
		</header>
	)
}