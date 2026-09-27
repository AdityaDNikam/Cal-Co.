import { useState } from 'react'
import NeonIcon from '../components/NeonIcon'
import type { Page } from '../App'

interface Props { navigate: (p: Page) => void }

export default function SignUpPage({ navigate }: Props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('dashboard') }, 900)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.25rem,5vw,3rem)', height: '64px',
        borderBottom: '1px solid var(--border)',
      }}>
        <button onClick={() => navigate('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(181,255,77,0.08)', border: '1px solid rgba(181,255,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NeonIcon name="bolt" size={15} />
          </div>
          <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--foreground)', letterSpacing: '-0.04em' }}>
            Cal<span style={{ color: 'var(--primary)' }}>.Co</span>
          </span>
        </button>
        <button onClick={() => navigate('login')} style={{
          background: 'transparent', border: '1px solid var(--border)',
          color: 'var(--foreground)', borderRadius: 'var(--radius)',
          padding: '0.5rem 1.25rem', fontFamily: 'var(--font-inter)', fontWeight: 500,
          fontSize: '0.875rem', cursor: 'pointer',
        }}>
          Log in
        </button>
      </nav>

      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(2rem,5vh,4rem) 1.25rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '5%', left: '5%', width: '35vw', height: '35vw', background: 'radial-gradient(ellipse, rgba(181,255,77,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{
          width: '100%', maxWidth: '420px',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'calc(var(--radius) + 4px)',
          padding: 'clamp(2rem,5vw,2.75rem)',
        }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '1.875rem', letterSpacing: '-0.03em', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
              Create account
            </h1>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9375rem' }}>
              Start your transformation today
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Username
              </label>
              <input type="text" placeholder="e.g. alex_lifts" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Email
              </label>
              <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Password
              </label>
              <input type="password" placeholder="Min 8 characters" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required />
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
              By signing up you agree to our{' '}
              <a style={{ color: 'var(--primary)', cursor: 'pointer' }}>Terms</a>{' '}and{' '}
              <a style={{ color: 'var(--primary)', cursor: 'pointer' }}>Privacy Policy</a>.
            </p>

            <button
              type="submit" disabled={loading}
              className={loading ? '' : 'glow-primary'}
              style={{
                background: loading ? 'var(--muted)' : 'var(--primary)',
                color: loading ? 'var(--muted-foreground)' : 'var(--primary-foreground)',
                border: 'none', borderRadius: 'var(--radius)', padding: '0.875rem',
                fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s', letterSpacing: '-0.01em',
              }}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
            Already have an account?{' '}
            <button onClick={() => navigate('login')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: 'var(--font-inter)', fontSize: '0.875rem' }}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
