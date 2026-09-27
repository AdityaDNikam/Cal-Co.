import NeonIcon from '../components/NeonIcon'
import type { Page } from '../App'

interface Props { navigate: (p: Page) => void }

const features = [
  { icon: 'chart' as const, title: 'Track Macros', desc: 'Log protein, carbs, and calories with precision every single day.' },
  { icon: 'chart' as const, title: 'Visual Progress', desc: 'Beautiful charts that show your momentum at a glance.' },
  { icon: 'dumbbell' as const, title: 'Workout Logs', desc: 'Plan workouts, record sets, and crush every session.' },
  { icon: 'target' as const, title: 'Smart Goals', desc: 'Set targets and let the app keep you accountable.' },
]

const stats = [
  { value: '2.4M+', label: 'Active users' },
  { value: '98%', label: 'Goal hit rate' },
  { value: '4.9', label: 'App rating' },
]

export default function LandingPage({ navigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.25rem, 5vw, 3rem)',
        height: '64px',
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '8px',
            background: 'rgba(181,255,77,0.08)',
            border: '1px solid rgba(181,255,77,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <NeonIcon name="bolt" size={16} />
          </div>
          <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.04em' }}>
            Cal<span style={{ color: 'var(--primary)' }}>.Co</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={() => navigate('login')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
              borderRadius: 'var(--radius)',
              padding: '0.5rem 1.25rem',
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(181,255,77,0.4)'
              ;(e.target as HTMLButtonElement).style.color = 'var(--primary)'
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.borderColor = 'var(--border)'
              ;(e.target as HTMLButtonElement).style.color = 'var(--foreground)'
            }}
          >
            Log in
          </button>
          <button
            onClick={() => navigate('signup')}
            style={{
              background: 'var(--primary)',
              border: 'none',
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius)',
              padding: '0.5rem 1.25rem',
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.opacity = '0.85'}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.opacity = '1'}
          >
            Sign up free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(4rem,10vh,8rem) clamp(1.25rem,5vw,3rem) 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: 'min(700px,120vw)', height: 'min(700px,120vw)',
          background: 'radial-gradient(ellipse, rgba(181,255,77,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: '-10%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(181,255,77,0.08)',
          border: '1px solid rgba(181,255,77,0.2)',
          borderRadius: '99px',
          padding: '0.375rem 1rem',
          marginBottom: '2rem',
        }}>
          <NeonIcon name="star" size={12} />
          <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            New — AI meal planner live
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: 'var(--foreground)',
          maxWidth: '14ch', marginBottom: '1.5rem',
        }}>
          Your body.<br />
          <span style={{ color: 'var(--primary)' }}>Your data.</span><br />
          Your results.
        </h1>

        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--muted-foreground)',
          maxWidth: '46ch', lineHeight: 1.7, marginBottom: '2.5rem',
        }}>
          Track calories, protein, and workouts in one focused app built for people who take their health seriously.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('signup')}
            className="glow-primary"
            style={{
              background: 'var(--primary)', color: 'var(--primary-foreground)',
              border: 'none', borderRadius: 'var(--radius)',
              padding: '0.875rem 2rem',
              fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1rem',
              cursor: 'pointer', transition: 'opacity 0.2s', letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.opacity = '0.85'}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.opacity = '1'}
          >
            Start for free
          </button>
          <button
            onClick={() => navigate('login')}
            style={{
              background: 'var(--secondary)', color: 'var(--foreground)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              padding: '0.875rem 2rem',
              fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '1rem',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.background = 'var(--muted)'}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.background = 'var(--secondary)'}
          >
            Log in
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 'clamp(2rem,6vw,4rem)',
          marginTop: '4rem', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: 'clamp(1.5rem,4vw,2.25rem)', color: 'var(--primary)', letterSpacing: '-0.03em' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: 'clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,3rem)',
        maxWidth: '1200px', margin: '0 auto', width: '100%',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-outfit)', fontWeight: 800,
          fontSize: 'clamp(1.75rem,4vw,3rem)', letterSpacing: '-0.03em',
          color: 'var(--foreground)', marginBottom: '3rem', textAlign: 'center',
        }}>
          Everything you need to <span style={{ color: 'var(--primary)' }}>level up</span>
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {features.map(f => (
            <div key={f.title}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'calc(var(--radius) + 4px)', padding: '1.75rem',
                transition: 'border-color 0.25s, transform 0.25s', cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(181,255,77,0.25)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'none'
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '10px',
                background: 'rgba(181,255,77,0.07)',
                border: '1px solid rgba(181,255,77,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <NeonIcon name={f.icon} size={18} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--foreground)', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        margin: '0 clamp(1.25rem,5vw,3rem) clamp(4rem,8vh,7rem)',
        background: 'linear-gradient(135deg, rgba(181,255,77,0.08) 0%, rgba(124,58,237,0.1) 100%)',
        border: '1px solid rgba(181,255,77,0.15)',
        borderRadius: 'calc(var(--radius) + 8px)',
        padding: 'clamp(2.5rem,5vw,4rem)',
        textAlign: 'center',
      }}>
        <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: 'clamp(1.5rem,4vw,2.5rem)', letterSpacing: '-0.03em', color: 'var(--foreground)', marginBottom: '1rem' }}>
          Ready to transform your body?
        </h2>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', fontSize: '1rem' }}>
          Join 2.4 million athletes already using Cal.Co
        </p>
        <button
          onClick={() => navigate('signup')}
          className="glow-primary"
          style={{
            background: 'var(--primary)', color: 'var(--primary-foreground)',
            border: 'none', borderRadius: 'var(--radius)',
            padding: '0.875rem 2.5rem',
            fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
          }}
        >
          Get started — it's free
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem clamp(1.25rem,5vw,3rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, color: 'var(--muted-foreground)', fontSize: '0.875rem', letterSpacing: '-0.02em' }}>
          Cal<span style={{ color: 'var(--primary)' }}>.Co</span> © 2026
        </span>
        <span style={{ color: 'var(--muted-foreground)', fontSize: '0.8125rem' }}>Privacy · Terms · Support</span>
      </footer>
    </div>
  )
}
