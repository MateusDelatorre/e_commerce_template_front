export type AdminSection = 'dashboard' | 'products' | 'orders' | 'employees' | 'my-plan'

type AdminSidePanelProps = {
	currentSection: AdminSection
	onSectionChange: (section: AdminSection) => void
}

const sections: { id: AdminSection; label: string; number: string }[] = [
	{ id: 'dashboard', label: 'Dashboard', number: '01' },
	{ id: 'products', label: 'Products', number: '02' },
	{ id: 'orders', label: 'Orders', number: '03' },
	{ id: 'employees', label: 'Employees', number: '04' },
	{ id: 'my-plan', label: 'My plan', number: '05' },
]

export default function AdminSidePanel({ currentSection, onSectionChange }: AdminSidePanelProps) {
	return (
		<aside className="admin-side-panel">
			<div className="admin-panel-intro">
				<p className="admin-kicker">Store management</p>
				<h1>Control<br /><span>center</span></h1>
				<p className="admin-panel-copy">One workspace for your catalogue, team, and customer operations.</p>
			</div>
			<nav className="admin-nav" aria-label="Admin sections">
				{sections.map((section) => (
					<button className={currentSection === section.id ? 'admin-nav-item active' : 'admin-nav-item'} key={section.id} onClick={() => onSectionChange(section.id)}>
						<span className="admin-nav-number">{section.number}</span><span className="admin-nav-label">{section.label}</span><b aria-hidden="true">›</b>
					</button>
				))}
			</nav>
		</aside>
	)
}