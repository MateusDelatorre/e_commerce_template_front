type UserCardProps = {
	onClose: () => void
}

export default function UserCard({ onClose }: UserCardProps) {
	return (
		<div className="admin-user-card" role="dialog" aria-label="Conta do usuário">
			<div className="admin-user-card-heading">
				<div className="admin-avatar large" aria-hidden="true">A</div>
				<div>
					<strong>Usuário administrador</strong>
					<span>admin@example.com</span>
				</div>
				<button className="admin-card-close" onClick={onClose} aria-label="Fechar cartão do usuário">×</button>
			</div>
			<a href="/user" className="admin-account-link">Ver conta do cliente <span>↗</span></a>
		</div>
	)
}