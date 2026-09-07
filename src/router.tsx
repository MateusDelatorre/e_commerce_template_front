import MainPage from './main_page'
import LoginPage from './auth/login'
import RegisterPage from './auth/register'
import NotFoundPage from './pages/not_found_page'

export function getPageFromRoute(path = window.location.pathname) {
  if (path === '/login') return <LoginPage onBack={navigateToHome} />
  if (path === '/register') return <RegisterPage onBack={navigateToHome} />
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