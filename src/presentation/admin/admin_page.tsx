import { useEffect, useState } from 'react'
import { navigateToLogin } from '../../router'
import authServiceInstance from '../auth/auth_service'
import AdminHeader from './components/admin_header'
import AdminSidePanel, { type AdminSection } from './components/admin_side_panel'
import DashboardContent from './contents/dashboard_content'
import EmployeesContent from './contents/employees_content'
import MyPlanContent from './contents/my_plan_content'
import OrdersContent from './contents/orders_content'
import ProductsContent from './contents/products_content'
import './admin.css'

export default function AdminPage() {
	const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard')
	const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('admin-theme') === 'dark')
	const isAuthenticated = Boolean(authServiceInstance.getToken())

	useEffect(() => {
		if (!isAuthenticated) navigateToLogin()
	}, [isAuthenticated])

	if (!isAuthenticated) return null

	const content = {
		dashboard: <DashboardContent />,
		products: <ProductsContent />,
		orders: <OrdersContent />,
		employees: <EmployeesContent />,
		'my-plan': <MyPlanContent />,
	}[currentSection]

	return (
		<main className={isDarkMode ? 'admin-page admin-dark' : 'admin-page'}>
			<AdminHeader onLogout={() => {
				authServiceInstance.clearToken()
				navigateToLogin()
			}} isDarkMode={isDarkMode} onThemeChange={() => {
				const nextMode = !isDarkMode
				setIsDarkMode(nextMode)
				localStorage.setItem('admin-theme', nextMode ? 'dark' : 'light')
			}} />
			<div className="admin-layout">
				<AdminSidePanel currentSection={currentSection} onSectionChange={setCurrentSection}/>
				<section className="admin-content">{content}</section>
			</div>
		</main>
	)
}