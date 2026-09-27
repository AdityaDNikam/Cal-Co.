import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard'

export type Page = 'landing' | 'login' | 'signup' | 'dashboard'

export default function App() {
  const [page, setPage] = useState<Page>('landing')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      {page === 'landing' && <LandingPage navigate={setPage} />}
      {page === 'login' && <LoginPage navigate={setPage} />}
      {page === 'signup' && <SignUpPage navigate={setPage} />}
      {page === 'dashboard' && <Dashboard navigate={setPage} />}
    </div>
  )
}
