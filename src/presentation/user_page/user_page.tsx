import MainHeader from "../components/main_header";
import { useState } from "react";
import authServiceInstance from "../auth/auth_service"
import { navigateToLogin } from "../../router";
import SidePanel, { type UserPageSection } from './side_panel'
import AddAddressContent from './contents/add_address_content'
import AddressContent from './contents/address_content'
import OrdersContent from './contents/orders_content'
import UserDataContent from './contents/user_data_content'

export default function UserPage(){
	const [currentSection, setCurrentSection] = useState<UserPageSection>('user-data')
	const [isAddingAddress, setIsAddingAddress] = useState(false)
	if (!authServiceInstance.getToken()) {
		navigateToLogin();
	}

	function handleLogout() {
		authServiceInstance.clearToken()
		navigateToLogin()
	}

	return (
		<main className="account-page">
			<MainHeader onLogin={navigateToLogin} />
			<div className="account-layout">
				<SidePanel currentSection={currentSection} onSectionChange={(section) => { setCurrentSection(section); setIsAddingAddress(false) }} onLogout={handleLogout} />
				{isAddingAddress ? <AddAddressContent onBack={() => setIsAddingAddress(false)} /> : currentSection === 'user-data' ? <UserDataContent /> : currentSection === 'addresses' ? <AddressContent onAddAddress={() => setIsAddingAddress(true)} /> : <OrdersContent />}
			</div>
		</main>
	)
}