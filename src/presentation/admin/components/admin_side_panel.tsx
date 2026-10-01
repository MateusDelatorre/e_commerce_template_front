export type AdminSection = 'dashboard' | 'products' | 'orders' | 'employees' | 'my-plan'

type AdminSidePanelProps = {
	currentSection: AdminSection
	onSectionChange: (section: AdminSection) => void
	canConfigureSite: boolean
}

const sections: { id: AdminSection; label: string; number: string }[] = [
	{ id: 'dashboard', label: 'Painel', number: '01' },
	{ id: 'products', label: 'Produtos', number: '02' },
	{ id: 'orders', label: 'Pedidos', number: '03' },
	{ id: 'employees', label: 'Funcionários', number: '04' },
	{ id: 'my-plan', label: 'Configuração do site', number: '05' },
]

export default function AdminSidePanel({ currentSection, onSectionChange, canConfigureSite }: AdminSidePanelProps) {
	const visibleSections = sections.filter((section) => {
		if (section.id === 'my-plan' || section.id === 'employees') return canConfigureSite
		return true
	})

	return (
		<aside className="admin-side-panel">
			<div className="admin-panel-intro">
				<p className="admin-kicker">Gestão da loja</p>
				<h1>Centro de<br /><span>controle</span></h1>
				<p className="admin-panel-copy">Um espaço para seu catálogo, sua equipe e suas operações.</p>
			</div>
			<nav className="admin-nav" aria-label="Seções administrativas">
				{visibleSections.map((section) => (
					<button className={currentSection === section.id ? 'admin-nav-item active' : 'admin-nav-item'} key={section.id} onClick={() => onSectionChange(section.id)}>
						<span className="admin-nav-number">{section.number}</span><span className="admin-nav-label">{section.label}</span><b aria-hidden="true">›</b>
					</button>
				))}
			</nav>
		</aside>
	)
}