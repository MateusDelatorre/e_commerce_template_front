import MainPage from './presentation/home/main_page'
import LoginPage from './presentation/auth/login'
import RegisterPage from './presentation/auth/register'
import NotFoundPage from './presentation/error_pages/not_found_page'
import UserPage from './presentation/user_page/user_page'
import AdminPage from './presentation/admin/admin_page'
import ProductPage from './presentation/product/product_page'
import BagPage from './presentation/bag/bag_page'
import CheckoutPage from './presentation/checkout/checkout_page'
import AdminOrderPage from './presentation/admin/contents/admin_order_page'
import SearchResultsPage from './presentation/search/search_results_page'
import authServiceInstance from './presentation/auth/auth_service'

export function getPageFromRoute(path = window.location.pathname) {
  if (path === '/login') return <LoginPage onBack={navigateToHome} />
  if (path === '/register') return <RegisterPage onBack={navigateToHome} />
  if (path === '/user') return authServiceInstance.getToken() ? <UserPage /> : <LoginPage onBack={navigateToHome} />
  if (path === '/admin') return authServiceInstance.getToken() ? <AdminPage /> : <LoginPage onBack={navigateToHome} />
  const adminProductMatch = path.match(/^\/admin\/products\/(\d+)$/)
  if (adminProductMatch) return authServiceInstance.getToken() ? <AdminPage initialProductId={Number(adminProductMatch[1])} /> : <LoginPage onBack={navigateToHome} />
  const adminOrderMatch = path.match(/^\/admin\/orders\/(\d+)$/)
  if (adminOrderMatch) return authServiceInstance.getToken() ? <AdminOrderPage orderId={Number(adminOrderMatch[1])} /> : <LoginPage onBack={navigateToHome} />
  if (path === '/bag') return <BagPage />
  if (path === '/checkout') {
    return authServiceInstance.getToken()
      ? <CheckoutPage />
      : <LoginPage onBack={() => navigateTo('/bag')} redirectTo="/checkout" />
  }
  if (path === '/search') return <SearchResultsPage />
  const productMatch = path.match(/^\/products\/(\d+)$/)
  if (productMatch) return <ProductPage productId={Number(productMatch[1])} />
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