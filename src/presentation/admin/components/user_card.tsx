type UserCardProps = {
	onClose: () => void
}

export default function UserCard({ onClose }: UserCardProps) {
	return (
		<div className="admin-user-card" role="dialog" aria-label="User account">
			<div className="admin-user-card-heading">
				<div className="admin-avatar large" aria-hidden="true">A</div>
				<div>
					<strong>Admin user</strong>
					<span>admin@example.com</span>
				</div>
				<button className="admin-card-close" onClick={onClose} aria-label="Close user card">×</button>
			</div>
			<a href="/user" className="admin-account-link">View customer account <span>↗</span></a>
		</div>
	)
}