import './App.css'
import { useEffect, useState } from 'react'
import { getPageFromRoute } from './router'


function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handleLocationChange)

    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  return (
    getPageFromRoute(pathname)
  )
}

export default App
