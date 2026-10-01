export type UserPageSection = 'user-data' | 'addresses' | 'orders'

type SidePanelProps = {
	currentSection: UserPageSection
	onSectionChange: (section: UserPageSection) => void
	onLogout: () => void
}

const sections: { id: UserPageSection; label: string; number: string }[] = [
	{ id: 'user-data', label: 'Meus Dados', number: '01' },
	{ id: 'addresses', label: 'Meus endereços', number: '02' },
	{ id: 'orders', label: 'Meus pedidos', number: '03' },
]

export default function SidePanel({ currentSection, onSectionChange, onLogout }: SidePanelProps){
	return (
		<aside className="side-panel">
			<div>
				<p className="eyebrow">Minha conta</p>
				<h1>Meu<br /><em>lugar</em></h1>
			</div>
			<nav className="account-nav" aria-label="Account sections">
				{sections.map((section) => (
					<button className={currentSection === section.id ? 'account-nav-item active' : 'account-nav-item'} key={section.id} onClick={() => onSectionChange(section.id)}>
						<span>{section.number}</span>{section.label}<b>↗</b>
					</button>
				))}
			</nav>
			<button className="account-logout" type="button" onClick={onLogout}>Sair da conta</button>
			<p className="side-panel-note">Escolha seus essenciais.<br />Mantenha-os por perto.</p>
		</aside>
	)
}