export default function DashboardContent() {
	return (
		<div className="admin-content-placeholder">
			<p className="admin-kicker">Overview / 01</p>
			<h2>Good morning, Admin.</h2>
			<p className="admin-view-copy">
				Here is what is happening across your store today.
			</p>

			<div className="admin-metrics">
				<article>
					<span>Revenue</span>
					<strong>$24,890</strong>
					<small>+12.4% this month</small>
				</article>
				<article>
					<span>Orders</span>
					<strong>184</strong>
					<small>+8.2% this month</small>
				</article>
				<article>
					<span>Customers</span>
					<strong>1,284</strong>
					<small>+5.7% this month</small>
				</article>
			</div>
		</div>
	)
}