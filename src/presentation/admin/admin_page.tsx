import { useEffect, useState } from 'react'
import { navigateToLogin } from '../../router'
import authServiceInstance from '../auth/auth_service'
import getUserData from '../../repository/api/user_endpoints/get_user_data'
import type UserModel from '../../core/model/user'
import AdminHeader from './components/admin_header'
import AdminSidePanel, { type AdminSection } from './components/admin_side_panel'
import DashboardContent from './contents/dashboard_content'
import EmployeesContent from './contents/employees_content'
import MyPlanContent from './contents/my_plan_content'
import OrdersContent from './contents/orders_content'
import ProductsContent from './contents/products_content'
import AdminProductEditPage from './contents/admin_product_edit_page'
import './admin.css'

type AdminPageProps = { initialProductId?: number }

export default function AdminPage({ initialProductId }: AdminPageProps) {
	const [currentSection, setCurrentSection] = useState<AdminSection>(initialProductId ? 'products' : 'dashboard')
	const [editingProductId, setEditingProductId] = useState<number | null>(initialProductId ?? null)
	const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('admin-theme') === 'dark')
	const [userRole, setUserRole] = useState<UserModel['role'] | null>(null)
	const isAuthenticated = Boolean(authServiceInstance.getToken())
	const canConfigureSite = userRole === 'admin' || userRole === 'owner' || userRole === 'developer'

	useEffect(() => {
		if (!isAuthenticated) navigateToLogin()
		if (isAuthenticated) getUserData().then((user) => setUserRole(user.role)).catch(() => setUserRole(null))
	}, [isAuthenticated])

	if (!isAuthenticated) return null

	function handleSectionChange(section: AdminSection) {
		if (editingProductId !== null) {
			window.history.replaceState({}, '', '/admin')
			setEditingProductId(null)
		}
		setCurrentSection(section)
	}

	function handleProductSelect(productId: number) {
		window.history.replaceState({}, '', `/admin/products/${productId}`)
		setCurrentSection('products')
		setEditingProductId(productId)
	}

	const content = editingProductId !== null ? <AdminProductEditPage productId={editingProductId} /> : {
		dashboard: <DashboardContent />,
		products: <ProductsContent onSelectProduct={handleProductSelect} />,
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
				<AdminSidePanel currentSection={currentSection} onSectionChange={handleSectionChange} canConfigureSite={canConfigureSite}/>
				<section className="admin-content">{content}</section>
			</div>
		</main>
	)
}