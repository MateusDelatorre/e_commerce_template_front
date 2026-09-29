import MainPage from './presentation/home/main_page'
import LoginPage from './presentation/auth/login'
import RegisterPage from './presentation/auth/register'
import NotFoundPage from './presentation/error_pages/not_found_page'
import UserPage from './presentation/user_page/user_page'
import AdminPage from './presentation/admin/admin_page'
import authServiceInstance from './presentation/auth/auth_service'

export function getPageFromRoute(path = window.location.pathname) {
  if (path === '/login') return <LoginPage onBack={navigateToHome} />
  if (path === '/register') return <RegisterPage onBack={navigateToHome} />
  if (path === '/user') return authServiceInstance.getToken() ? <UserPage /> : <LoginPage onBack={navigateToHome} />
  if (path === '/admin') return authServiceInstance.getToken() ? <AdminPage /> : <LoginPage onBack={navigateToHome} />
  if (path === '/') return <MainPage />
  return <NotFoundPage />
}

export function navigateTo(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('popstate'))
}

export function navigateToLogin() {
  navigateTo('/login')
}

export function navigateToRegister() {
  navigateTo('/register')
}

export function navigateToHome() {
  navigateTo('/')
}