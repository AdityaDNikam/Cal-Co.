import { useState, useEffect, useRef } from 'react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import NeonIcon from '../components/NeonIcon'
import type { Page } from '../App'

interface Props { navigate: (p: Page) => void }

const proteinData = [
  { day: 'Mon', grams: 142 },
  { day: 'Tue', grams: 178 },
  { day: 'Wed', grams: 155 },
  { day: 'Thu', grams: 190 },
  { day: 'Fri', grams: 168 },
  { day: 'Sat', grams: 210 },
  { day: 'Sun', grams: 185 },
]

const caloriesData = [
  { day: 'Mon', kcal: 1850 },
  { day: 'Tue', kcal: 2120 },
  { day: 'Wed', kcal: 1980 },
  { day: 'Thu', kcal: 2240 },
  { day: 'Fri', kcal: 2050 },
  { day: 'Sat', kcal: 2380 },
  { day: 'Sun', kcal: 2100 },
]

const CustomTooltipProtein = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.625rem 0.875rem' }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.125rem', color: '#b5ff4d' }}>{payload[0].value}g protein</p>
    </div>
  )
}

const CustomTooltipCalories = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.625rem 0.875rem' }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.125rem', color: '#a78bfa' }}>{payload[0].value.toLocaleString()} kcal</p>
    </div>
  )
}

const quickStats = [
  { label: 'Streak', value: '14 days', icon: 'fire' as const, color: '#ff6b35' },
  { label: 'Workouts', value: '6 this week', icon: 'dumbbell' as const, color: '#b5ff4d' },
  { label: 'Water intake', value: '2.4 L / day', icon: 'water' as const, color: '#38bdf8' },
  { label: 'Body weight', value: '—', icon: 'scale' as const, color: '#8080a0', incomplete: true },
]

interface Message {
  id: string
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

function AiSphere({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const run = () => {
      setPhase('in')
      setVisible(true)
      timerRef.current = setTimeout(() => {
        setPhase('hold')
        timerRef.current = setTimeout(() => {
          setPhase('out')
          timerRef.current = setTimeout(() => {
            setVisible(false)
          }, 500)
        }, 2800)
      }, 400)
    }

    // first show after 2s
    timerRef.current = setTimeout(run, 2000)
    const interval = setInterval(run, 15000)
    return () => {
      clearInterval(interval)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const cloudOpacity = phase === 'in' ? 1 : phase === 'hold' ? 1 : 0
  const cloudTranslate = phase === 'in' ? '0px' : phase === 'hold' ? '0px' : '-6px'

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.75rem',
      right: isOpen ? '26%' : '1.75rem',
      zIndex: 95,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'right 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {/* Clickable Sphere Button */}
      <button
        onClick={onClick}
        aria-label="Open AI Assistant"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          position: 'relative',
          outline: 'none',
        }}
      >
        <div style={{
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: isOpen
            ? 'radial-gradient(circle at 35% 35%, rgba(181,255,77,0.45), rgba(124,58,237,0.65) 70%, rgba(10,10,15,0.95))'
            : 'radial-gradient(circle at 35% 35%, rgba(181,255,77,0.3), rgba(124,58,237,0.45) 60%, rgba(10,10,15,0.85))',
          border: isOpen ? '2px solid rgba(181,255,77,0.85)' : '1.5px solid rgba(181,255,77,0.4)',
          boxShadow: isOpen
            ? '0 0 32px rgba(181,255,77,0.45), 0 0 12px rgba(124,58,237,0.4), inset 0 0 20px rgba(181,255,77,0.3)'
            : '0 0 24px rgba(181,255,77,0.22), inset 0 0 18px rgba(124,58,237,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          animation: 'spherePulse 3s ease-in-out infinite',
        }}>
          {/* Inner ring */}
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: '1px solid rgba(181,255,77,0.3)',
            background: 'rgba(10,10,15,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {isOpen ? (
              <span style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1 }}>✕</span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#b5ff4d" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#b5ff4d" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="rgba(181,255,77,0.5)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>

        {/* AI Badge indicator */}
        {!isOpen && (
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'var(--primary)',
            boxShadow: '0 0 8px #b5ff4d',
            border: '2px solid #0a0a0f',
          }} />
        )}
      </button>

      {/* Thinking cloud bubble */}
      {visible && !isOpen && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 12px)',
          right: '50%',
          transform: `translateX(50%) translateY(${cloudTranslate})`,
          opacity: cloudOpacity,
          transition: 'opacity 0.45s ease, transform 0.45s ease',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 90,
        }}>
          {/* Main cloud */}
          <div style={{
            background: 'rgba(19,19,30,0.98)',
            border: '1px solid rgba(181,255,77,0.4)',
            borderRadius: '16px',
            padding: '0.625rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 16px rgba(181,255,77,0.18)',
          }}>
            {/* Animated dots */}
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--primary)',
                  animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 700, fontSize: '0.875rem',
              color: 'var(--primary)',
              letterSpacing: '-0.01em',
            }}>
              Let AI help
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" stroke="#b5ff4d" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Tail dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(19,19,30,0.98)', border: '1px solid rgba(181,255,77,0.3)' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(19,19,30,0.98)', border: '1px solid rgba(181,255,77,0.2)', marginTop: '2px' }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes spherePulse {
          0%, 100% { box-shadow: 0 0 20px rgba(181,255,77,0.2), inset 0 0 16px rgba(124,58,237,0.25); }
          50% { box-shadow: 0 0 36px rgba(181,255,77,0.35), inset 0 0 24px rgba(124,58,237,0.4); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 110,
        background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '580px',
          background: 'var(--card)', border: '1px solid rgba(181,255,77,0.2)',
          borderRadius: 'calc(var(--radius) + 6px)',
          padding: 'clamp(1.5rem,4vw,2.25rem)',
          position: 'relative',
          maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(181,255,77,0.08)',
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          background: 'var(--secondary)', border: '1px solid var(--border)',
          borderRadius: '8px', width: 30, height: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--muted-foreground)', fontSize: '0.9375rem',
          transition: 'color 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--foreground)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
        >✕</button>
        {children}
      </div>
    </div>
  )
}

/* Three-Step User Details Form Flow */
function UserDetailsMultiStepModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Step 1: Personal & Medical Details
  const [userName, setUserName] = useState('')
  const [surname, setSurname] = useState('')
  const [dob, setDob] = useState('')
  const [age, setAge] = useState('')
  const [bloodGroup, setBloodGroup] = useState('A+')
  const [gender, setGender] = useState('Male')
  const [occupation, setOccupation] = useState('Working-Professional')
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([])
  const [otherDiseaseText, setOtherDiseaseText] = useState('')
  const [medicalDescription, setMedicalDescription] = useState('')

  // Step 2: Fitness Journey Till Date
  const [experience, setExperience] = useState('Less than 1 Year')
  const [exerciseForm, setFormOfExercise] = useState('Weight Training')
  const [fitnessDays, setFitnessDays] = useState<number>(5)
  const [preferredWorkout, setPreferredWorkout] = useState('Weight Training')
  const [minWorkoutTime, setMinWorkoutTime] = useState<number>(30)

  // Step 3: Fitness Goals
  const [selectedGoal, setSelectedGoal] = useState<string>('lose')
  const [goalDescription, setGoalDescription] = useState('')

  const hereditaryDiseases = [
    'Diabetes',
    'Blood Pressure',
    'Thyroid',
    'Asthma',
    'Heart Condition',
    'Arthritis',
    'Others',
  ]

  const toggleDisease = (d: string) => {
    if (selectedDiseases.includes(d)) {
      setSelectedDiseases(selectedDiseases.filter(item => item !== d))
    } else {
      setSelectedDiseases([...selectedDiseases, d])
    }
  }

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault()
    onSave()
    onClose()
  }

  return (
    <ModalOverlay onClose={onClose}>
      {/* Header with Step Indicator */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '1.375rem', letterSpacing: '-0.03em', color: 'var(--foreground)' }}>
              {step === 1 && 'Personal & Medical Details'}
              {step === 2 && 'Fitness Journey Till Date'}
              {step === 3 && 'Fitness Goals'}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', marginTop: '0.125rem' }}>
              Step {step} of 3 • {step === 1 ? 'Personal Information' : step === 2 ? 'Activity & Experience' : 'Your Targets'}
            </p>
          </div>

          <div style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-outfit)',
            fontWeight: 700,
            color: 'var(--primary)',
            background: 'rgba(181,255,77,0.1)',
            border: '1px solid rgba(181,255,77,0.25)',
            borderRadius: '99px',
            padding: '0.25rem 0.75rem',
          }}>
            {step === 1 ? '33%' : step === 2 ? '66%' : '100%'}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: 4, background: 'var(--secondary)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
            height: '100%',
            background: 'var(--primary)',
            borderRadius: 99,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* STEP 1: Personal & Medical Details */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Name & Surname */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                User Name *
              </label>
              <input type="text" placeholder="Alex" value={userName} onChange={e => setUserName(e.target.value)} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Surname *
              </label>
              <input type="text" placeholder="Johnson" value={surname} onChange={e => setSurname(e.target.value)} required />
            </div>
          </div>

          {/* DOB & Age */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Date of Birth
              </label>
              <input type="text" placeholder="1995-06-14" value={dob} onChange={e => setDob(e.target.value)} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Age
              </label>
              <input type="number" placeholder="29" value={age} onChange={e => setAge(e.target.value)} />
            </div>
          </div>

          {/* Blood Group & Gender */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-inter)',
                  outline: 'none',
                }}
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg} style={{ background: '#13131e', color: '#fff' }}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Gender
              </label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-inter)',
                  outline: 'none',
                }}
              >
                {['Male', 'Female', 'Non-Binary', 'Prefer not to say'].map(g => (
                  <option key={g} value={g} style={{ background: '#13131e', color: '#fff' }}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Occupation */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Occupation
            </label>
            <select
              value={occupation}
              onChange={e => setOccupation(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-inter)',
                outline: 'none',
              }}
            >
              <option value="Working-Professional" style={{ background: '#13131e', color: '#fff' }}>Working-Professional</option>
              <option value="Student" style={{ background: '#13131e', color: '#fff' }}>Student</option>
              <option value="Retired" style={{ background: '#13131e', color: '#fff' }}>Retired</option>
            </select>
          </div>

          {/* Medical History Dropdown / Pills */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.45rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Medical History (Select all that apply)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {hereditaryDiseases.map(d => {
                const active = selectedDiseases.includes(d)
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDisease(d)}
                    style={{
                      background: active ? 'rgba(181,255,77,0.12)' : 'var(--secondary)',
                      border: `1px solid ${active ? 'rgba(181,255,77,0.45)' : 'var(--border)'}`,
                      color: active ? 'var(--primary)' : 'var(--foreground)',
                      borderRadius: '99px',
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-inter)',
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {active ? `✓ ${d}` : `+ ${d}`}
                  </button>
                )
              })}
            </div>

            {/* Other disease input bar if 'Others' is selected */}
            {selectedDiseases.includes('Others') && (
              <div style={{ marginTop: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Diabetes, Blood Pressure, ..."
                  value={otherDiseaseText}
                  onChange={e => setOtherDiseaseText(e.target.value)}
                  style={{
                    border: '1px solid rgba(181,255,77,0.3)',
                    background: 'rgba(181,255,77,0.04)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Medical History Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Medical History Description
            </label>
            <textarea
              rows={3}
              placeholder="Provide a description of any medical conditions, injuries, or past surgeries..."
              value={medicalDescription}
              onChange={e => setMedicalDescription(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9375rem',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Next Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="glow-primary"
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1.75rem',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              Next: Fitness Journey →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Fitness Journey Till Date */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          {/* Exercise Experience */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Exercise Experience
            </label>
            <select
              value={experience}
              onChange={e => setExperience(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-inter)',
                outline: 'none',
              }}
            >
              {['Less than 1 Year', '1-3 Years', '3-5 Years', '5-10 Years', '+10 Years'].map(exp => (
                <option key={exp} value={exp} style={{ background: '#13131e', color: '#fff' }}>{exp}</option>
              ))}
            </select>
          </div>

          {/* Form of Exercise */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Form of Exercise
            </label>
            <select
              value={exerciseForm}
              onChange={e => setFormOfExercise(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-inter)',
                outline: 'none',
              }}
            >
              {['Weight Training', 'Cardio', 'Gymnastics', 'Combat Sports', 'Others'].map(form => (
                <option key={form} value={form} style={{ background: '#13131e', color: '#fff' }}>{form}</option>
              ))}
            </select>
          </div>

          {/* Days in week for fitness (Max 7) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              How many Days in week can you give for Fitness? (Max 7 allowed)
            </label>
            <input
              type="number"
              min={1}
              max={7}
              value={fitnessDays}
              onChange={e => {
                const val = parseInt(e.target.value) || 1
                setFitnessDays(Math.min(7, Math.max(1, val)))
              }}
              placeholder="e.g. 5"
              required
            />
          </div>

          {/* Preferred Workout */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Preferred Workout
            </label>
            <select
              value={preferredWorkout}
              onChange={e => setPreferredWorkout(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-inter)',
                outline: 'none',
              }}
            >
              {['Weight Training', 'Cardio', 'Gymnastics', 'Combat Sports', 'Others'].map(pref => (
                <option key={pref} value={pref} style={{ background: '#13131e', color: '#fff' }}>{pref}</option>
              ))}
            </select>
          </div>

          {/* Minimum time per day available (Minimum 20 mins) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Minimum Time per day available to spend for workout (Minimum 20 mins)
            </label>
            <input
              type="number"
              min={20}
              value={minWorkoutTime}
              onChange={e => setMinWorkoutTime(parseInt(e.target.value) || 20)}
              placeholder="e.g. 45 mins"
              required
            />
            {minWorkoutTime < 20 && (
              <p style={{ fontSize: '0.75rem', color: '#ff6b35', marginTop: '0.25rem' }}>Minimum requirement is 20 minutes/day</p>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="glow-primary"
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1.75rem',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              Next: Fitness Goals →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Fitness Goals */}
      {step === 3 && (
        <form onSubmit={handleFinish} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Goal selection cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.1rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Select Primary Goal
            </label>
            {[
              { id: 'lose', label: 'Lose weight', sub: 'Caloric deficit + cardio focus' },
              { id: 'maintain', label: 'Maintain weight', sub: 'Balanced macros and activity' },
              { id: 'gain', label: 'Build muscle', sub: 'Surplus + high protein' },
              { id: 'performance', label: 'Improve performance', sub: 'Periodized training + nutrition' },
            ].map(g => (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGoal(g.id)}
                style={{
                  background: selectedGoal === g.id ? 'rgba(181,255,77,0.08)' : 'var(--secondary)',
                  border: `1px solid ${selectedGoal === g.id ? 'rgba(181,255,77,0.4)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  padding: '0.875rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '0.9375rem', color: selectedGoal === g.id ? 'var(--primary)' : 'var(--foreground)' }}>
                  {g.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.125rem' }}>
                  {g.sub}
                </div>
              </button>
            ))}
          </div>

          {/* Goal Description Column */}
          <div>
            <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: '0.35rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Describe your Goal in few Words
            </label>
            <textarea
              rows={4}
              placeholder="Describe your goal in a few words... (e.g. Want to build lean muscle mass while lowering body fat percentage before summer)"
              value={goalDescription}
              onChange={e => setGoalDescription(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9375rem',
                outline: 'none',
                resize: 'vertical',
              }}
              required
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setStep(2)}
              style={{
                background: 'var(--secondary)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>

            <button
              type="submit"
              className="glow-primary"
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1.75rem',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                cursor: 'pointer',
              }}
            >
              ✓ Complete Profile
            </button>
          </div>
        </form>
      )}
    </ModalOverlay>
  )
}

function AiChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "⚡ **Cal.Co Kinetic AI Assistant online.**\n\nHey Alex! I've analyzed your performance data. Your protein intake averaged **175g/day** (+12% vs last week) and average calorie intake is sitting at **2,100 kcal**.\n\nHow can I help optimize your performance today?",
      timestamp: 'Just now',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const quickPrompts = [
    "⚡ Optimize today's protein target",
    "🥗 Suggest post-workout meal",
    "🔥 How to hit caloric target?",
    "🏋️ Workout intensity check",
  ]

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let aiText = "I've processed your metrics! Based on your target of 180g protein and 2,000 kcal:\n\n• **Macro split recommendation**: 35% Protein (175g), 45% Carbs (225g), 20% Fats (44g).\n• **Actionable tip**: Adding a Greek yogurt or whey smoothie after your workout will close today's 12g protein gap effortlessly."
      
      const lower = text.toLowerCase()
      if (lower.includes('protein')) {
        aiText = "⚡ **Protein Optimization Insights:**\n\nYour 7-day peak was **210g** on Saturday! To hit your 180g daily target consistently:\n\n1. **Breakfast**: 4 eggs + 2 egg whites (~32g)\n2. **Lunch**: 200g Grilled Chicken breast (~62g)\n3. **Post-workout**: Cal.Co Kinetic Whey Shake (~30g)\n4. **Dinner**: 200g Lean Salmon / Beef (~52g)"
      } else if (lower.includes('workout') || lower.includes('intensity')) {
        aiText = "🏋️ **Training & Recovery Analysis:**\n\nYou completed **6 workouts** this week with a 14-day consistency streak! Your volume load is optimal for muscle hypertrophy. Make sure to schedule an active recovery session with adequate hydration (2.4L+)."
      } else if (lower.includes('caloric') || lower.includes('calorie') || lower.includes('hit')) {
        aiText = "🔥 **Caloric Target Strategy:**\n\nYour current daily target is **2,000 kcal**. Over the past 7 days, your average was **2,100 kcal** (+5% surplus).\n\nIf your goal is **recomp/fat loss**, consider trimming 100 kcal from afternoon snacks while keeping protein locked at 180g."
      } else if (lower.includes('meal') || lower.includes('snack')) {
        aiText = "🥗 **Recommended Kinetic Snack:**\n\n**320 kcal | 34g Protein | 4g Fat**\n• 200g 0% Greek Yogurt\n• 1 scoop Vanilla Isolate\n• Handful of blueberries & chia seeds\n\nTakes 2 minutes to prepare!"
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1100)
  }

  const handleClear = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Chat cleared. Ready for your next fitness query!",
        timestamp: 'Just now',
      },
    ])
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      background: 'rgba(12,12,20,0.98)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(181,255,77,0.2)',
      boxShadow: '-12px 0 40px rgba(0,0,0,0.7)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(19,19,30,0.85)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(181,255,77,0.35), rgba(124,58,237,0.45))',
            border: '1px solid rgba(181,255,77,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 14px rgba(181,255,77,0.2)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" stroke="#b5ff4d" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--foreground)' }}>
                Cal.Co Kinetic AI
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                color: 'var(--primary)',
                background: 'rgba(181,255,77,0.12)',
                border: '1px solid rgba(181,255,77,0.25)',
                borderRadius: '99px',
                padding: '0.1rem 0.45rem',
              }}>
                GPT-4o
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b5ff4d', display: 'inline-block', boxShadow: '0 0 6px #b5ff4d' }} />
              Active &amp; Ready
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <button
            onClick={handleClear}
            title="Clear Chat"
            style={{
              background: 'var(--secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.4rem 0.65rem',
              color: 'var(--muted-foreground)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            Clear
          </button>

          <button
            onClick={onClose}
            title="Close Assistant"
            style={{
              background: 'var(--secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              width: 32, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--foreground)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.125rem',
      }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              maxWidth: '92%',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
            }}>
              {msg.sender === 'ai' && (
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: 'rgba(181,255,77,0.15)',
                  border: '1px solid rgba(181,255,77,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" stroke="#b5ff4d" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              <div style={{
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0.15) 100%)'
                  : 'var(--card)',
                border: msg.sender === 'user'
                  ? '1px solid rgba(124,58,237,0.4)'
                  : '1px solid rgba(255,255,255,0.08)',
                borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                padding: '0.75rem 0.9375rem',
                fontSize: '0.84375rem',
                lineHeight: '1.5',
                color: 'var(--foreground)',
                boxShadow: msg.sender === 'user'
                  ? '0 2px 12px rgba(124,58,237,0.15)'
                  : '0 2px 12px rgba(0,0,0,0.3)',
                whiteSpace: 'pre-line',
              }}>
                {msg.text.split('\n').map((line, idx) => {
                  const parts = line.split(/(\*\*.*?\*\*)/g)
                  return (
                    <div key={idx} style={{ marginBottom: line ? '0.2rem' : '0.4rem' }}>
                      {parts.map((p, pIdx) => {
                        if (p.startsWith('**') && p.endsWith('**')) {
                          return <strong key={pIdx} style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.slice(2, -2)}</strong>
                        }
                        return p
                      })}
                    </div>
                  )
                })}
              </div>
            </div>

            <span style={{
              fontSize: '0.65rem',
              color: 'var(--muted-foreground)',
              marginTop: '0.25rem',
              paddingLeft: msg.sender === 'ai' ? '2.1rem' : 0,
              paddingRight: msg.sender === 'user' ? '0.2rem' : 0,
            }}>
              {msg.timestamp}
            </span>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.2rem' }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'rgba(181,255,77,0.15)',
              border: '1px solid rgba(181,255,77,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" stroke="#b5ff4d" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '0.6rem 0.875rem',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--primary)',
                  animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{
        padding: '0.5rem 0.875rem 0.25rem 0.875rem',
        display: 'flex',
        gap: '0.375rem',
        overflowX: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            style={{
              background: 'rgba(181,255,77,0.05)',
              border: '1px solid rgba(181,255,77,0.18)',
              borderRadius: '99px',
              padding: '0.35rem 0.65rem',
              fontSize: '0.725rem',
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
              color: 'var(--foreground)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(181,255,77,0.12)'
              e.currentTarget.style.borderColor = 'rgba(181,255,77,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(181,255,77,0.05)'
              e.currentTarget.style.borderColor = 'rgba(181,255,77,0.18)'
            }}
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Box Area */}
      <div style={{
        padding: '0.75rem 0.875rem 1rem 0.875rem',
        borderTop: '1px solid var(--border)',
        background: 'rgba(15,15,24,0.95)',
      }}>
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSend()
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--secondary)',
            border: '1px solid rgba(181,255,77,0.25)',
            borderRadius: 'var(--radius)',
            padding: '0.45rem 0.5rem 0.45rem 0.875rem',
            boxShadow: '0 0 12px rgba(181,255,77,0.05)',
          }}
        >
          <input
            type="text"
            placeholder="Ask Cal.Co AI about macros, calories..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--foreground)',
              fontSize: '0.84375rem',
              outline: 'none',
              padding: 0,
              width: '100%',
              boxShadow: 'none',
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            style={{
              background: inputValue.trim() ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
              color: inputValue.trim() ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              border: 'none',
              borderRadius: '8px',
              width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: inputValue.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: '0.65rem',
          color: 'var(--muted-foreground)',
          marginTop: '0.5rem',
          opacity: 0.7,
        }}>
          Cal.Co AI provides tailored nutrition insights.
        </p>
      </div>
    </div>
  )
}

export default function Dashboard({ navigate }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileCompleted, setProfileCompleted] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const avgProtein = Math.round(proteinData.reduce((s, d) => s + d.grams, 0) / proteinData.length)
  const avgCalories = Math.round(caloriesData.reduce((s, d) => s + d.kcal, 0) / caloriesData.length)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)', overflowX: 'hidden' }}>
      {/* Three-Step User Details Modal */}
      {showProfileModal && (
        <UserDetailsMultiStepModal
          onClose={() => setShowProfileModal(false)}
          onSave={() => setProfileCompleted(true)}
        />
      )}

      {/* Floating AI Sphere */}
      <AiSphere onClick={() => setChatOpen(o => !o)} isOpen={chatOpen} />

      {/* Top Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1rem,4vw,2.5rem)', height: '64px',
        background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(181,255,77,0.08)', border: '1px solid rgba(181,255,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NeonIcon name="bolt" size={14} />
          </div>
          <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--foreground)', letterSpacing: '-0.04em' }}>
            Cal<span style={{ color: 'var(--primary)' }}>.Co</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <NavLinks />
          <DashButtons navigate={navigate} />
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(o => !o)} className="mobile-menu-btn" style={{
          background: 'none', border: '1px solid var(--border)', borderRadius: '8px',
          padding: '0.375rem 0.625rem', color: 'var(--foreground)', cursor: 'pointer', fontSize: '1rem',
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 49,
          background: 'var(--card)', borderBottom: '1px solid var(--border)',
          padding: '1.25rem clamp(1rem,4vw,2.5rem)',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {['Overview', 'Nutrition', 'Workouts', 'Progress'].map(l => (
            <a key={l} style={{ color: 'var(--muted-foreground)', fontSize: '0.9375rem', cursor: 'pointer' }}>{l}</a>
          ))}
          <div style={{ height: '1px', background: 'var(--border)', margin: '0.25rem 0' }} />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => navigate('landing')} style={{ flex: 1, background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)', borderRadius: 'var(--radius)', padding: '0.625rem', fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer' }}>
              Logout
            </button>
            <button style={{ flex: 1, background: 'var(--primary)', border: 'none', color: 'var(--primary-foreground)', borderRadius: 'var(--radius)', padding: '0.625rem', fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Main Body Layout: Split on desktop when chat is open (75% / 25%), Fullscreen on mobile */}
      <div style={{ flex: 1, display: 'flex', width: '100%', position: 'relative' }}>
        {/* Main Dashboard Content */}
        <div style={{
          flex: 1,
          width: chatOpen ? 'calc(100% - 320px)' : '100%',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          minWidth: 0,
          padding: 'clamp(1.25rem,3vw,2.25rem) clamp(1rem,3vw,2.25rem)',
          maxWidth: chatOpen ? '100%' : '1280px',
          margin: '0 auto',
        }}>

          {/* Profile completion banner */}
          <div style={{
            background: profileCompleted
              ? 'linear-gradient(135deg, rgba(181,255,77,0.12) 0%, rgba(181,255,77,0.04) 100%)'
              : 'linear-gradient(135deg, rgba(181,255,77,0.07) 0%, rgba(124,58,237,0.1) 100%)',
            border: `1px solid ${profileCompleted ? 'rgba(181,255,77,0.35)' : 'rgba(181,255,77,0.18)'}`,
            borderRadius: 'calc(var(--radius) + 4px)',
            padding: 'clamp(1.25rem,3vw,1.75rem)',
            marginBottom: '1.75rem',
          }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(181,255,77,0.1)', border: '1px solid rgba(181,255,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <NeonIcon name="user" size={18} />
                </div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: 'clamp(1.125rem,2.5vw,1.375rem)', letterSpacing: '-0.03em', color: 'var(--foreground)' }}>
                    {profileCompleted ? 'Profile Complete & Optimized' : "Let's Complete your profile"}
                  </h2>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', marginTop: '0.125rem' }}>
                    {profileCompleted ? 'Your personal details, medical history & fitness goals are saved.' : 'A complete profile unlocks personalised macro & calorie targets.'}
                  </p>
                </div>
              </div>

              {/* Progress pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(181,255,77,0.08)', border: '1px solid rgba(181,255,77,0.18)', borderRadius: '99px', padding: '0.375rem 0.875rem' }}>
                <div style={{ width: 60, height: 4, background: 'var(--secondary)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: profileCompleted ? '100%' : '40%', height: '100%', background: 'var(--primary)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                  {profileCompleted ? '100%' : '40%'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowProfileModal(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.6875rem 1.125rem',
                  fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.875rem',
                  color: 'var(--foreground)', cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(181,255,77,0.35)'
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(181,255,77,0.05)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--secondary)'
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: '7px', background: 'rgba(181,255,77,0.1)', border: '1px solid rgba(181,255,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <NeonIcon name="user" size={13} />
                </div>
                {profileCompleted ? 'Edit User Details' : 'User Details'}
              </button>

              <button
                onClick={() => setShowProfileModal(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.6875rem 1.125rem',
                  fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '0.875rem',
                  color: 'var(--foreground)', cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,58,237,0.5)'
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.07)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--secondary)'
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: '7px', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <NeonIcon name="goal" size={13} color="#a78bfa" />
                </div>
                {profileCompleted ? 'View Fitness Goals' : 'Goals'}
              </button>
            </div>
          </div>

          {/* Recharts Visualizers Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: chatOpen ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.75rem',
          }}>
            {/* Protein per Day */}
            <ChartCard title="Protein per Day" subtitle="Last 7 days" stat={`${avgProtein}g avg`} statColor="#b5ff4d" badge="↑ 12% vs last week">
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={proteinData} margin={{ top: 10, right: 4, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="proteinGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b5ff4d" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#b5ff4d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="day" tick={{ fill: '#8080a0', fontSize: 11, fontFamily: 'var(--font-inter)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8080a0', fontSize: 11, fontFamily: 'var(--font-inter)' }} axisLine={false} tickLine={false} unit="g" />
                  <Tooltip content={<CustomTooltipProtein />} cursor={{ stroke: 'rgba(181,255,77,0.2)', strokeWidth: 1 }} />
                  <ReferenceLine y={180} stroke="rgba(181,255,77,0.25)" strokeDasharray="4 4" label={{ value: 'Goal', fill: '#b5ff4d', fontSize: 10, fontFamily: 'var(--font-inter)' }} />
                  <Area type="monotone" dataKey="grams" stroke="#b5ff4d" strokeWidth={2.5} fill="url(#proteinGrad)" dot={{ fill: '#b5ff4d', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#b5ff4d' }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Calories per Day */}
            <ChartCard title="Calories per Day" subtitle="Last 7 days" stat={`${avgCalories.toLocaleString()} avg`} statColor="#a78bfa" badge="On target">
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={caloriesData} margin={{ top: 10, right: 4, left: -22, bottom: 0 }} barSize={20}>
                  <defs>
                    <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#8080a0', fontSize: 11, fontFamily: 'var(--font-inter)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8080a0', fontSize: 11, fontFamily: 'var(--font-inter)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltipCalories />} cursor={{ fill: 'rgba(167,139,250,0.06)' }} />
                  <ReferenceLine y={2000} stroke="rgba(167,139,250,0.3)" strokeDasharray="4 4" label={{ value: 'Target', fill: '#a78bfa', fontSize: 10, fontFamily: 'var(--font-inter)' }} />
                  <Bar dataKey="kcal" fill="url(#calGrad)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {quickStats.map(s => (
              <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'calc(var(--radius) + 2px)', padding: '1.125rem 0.875rem' }}>
                <div style={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.625rem' }}>
                  <NeonIcon name={s.icon} size={14} color={s.color} />
                </div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.125rem', color: s.incomplete ? 'var(--muted-foreground)' : s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>{s.label}</div>
                {s.incomplete && <div style={{ fontSize: '0.7rem', color: 'var(--primary)', marginTop: '0.35rem', cursor: 'pointer' }}>Add now</div>}
              </div>
            ))}
          </div>
        </div>

        {/* AI Assist Slide-In Chat Window */}
        {chatOpen && (
          <div className="ai-chat-drawer">
            <AiChatWindow onClose={() => setChatOpen(false)} />
          </div>
        )}
      </div>

      <style>{`
        /* Desktop Chat Drawer spans full length of screen (100vh) */
        @media (min-width: 768px) {
          .ai-chat-drawer {
            width: 25%;
            min-width: 320px;
            max-width: 440px;
            height: 100vh;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 100;
            flex-shrink: 0;
            animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }

        /* Mobile Chat Drawer takes full screen */
        @media (max-width: 767px) {
          .ai-chat-drawer {
            position: fixed;
            inset: 0;
            z-index: 120;
            width: 100vw;
            height: 100vh;
            animation: slideInUp 0.3s ease;
          }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }

        @media (min-width: 641px) and (max-width: 767px) {
          .mobile-menu-btn { display: flex !important; }
        }

        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function NavLinks() {
  return (
    <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
      {['Overview', 'Nutrition', 'Workouts', 'Progress'].map((l, i) => (
        <a key={l} style={{ fontSize: '0.875rem', color: i === 0 ? 'var(--foreground)' : 'var(--muted-foreground)', cursor: 'pointer', fontWeight: i === 0 ? 500 : 400, transition: 'color 0.15s' }}
          onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = 'var(--foreground)'}
          onMouseLeave={e => { if (i !== 0) (e.target as HTMLAnchorElement).style.color = 'var(--muted-foreground)' }}
        >{l}</a>
      ))}
    </div>
  )
}

function DashButtons({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
      <button onClick={() => navigate('landing')} style={{
        background: 'var(--secondary)', border: '1px solid var(--border)',
        color: 'var(--muted-foreground)', borderRadius: 'var(--radius)',
        padding: '0.5rem 1rem', fontFamily: 'var(--font-inter)', fontWeight: 500,
        fontSize: '0.8125rem', cursor: 'pointer', transition: 'color 0.15s',
      }}
        onMouseEnter={e => (e.target as HTMLButtonElement).style.color = 'var(--foreground)'}
        onMouseLeave={e => (e.target as HTMLButtonElement).style.color = 'var(--muted-foreground)'}
      >
        Logout
      </button>
      <button className="glow-primary" style={{
        background: 'var(--primary)', border: 'none',
        color: 'var(--primary-foreground)', borderRadius: 'var(--radius)',
        padding: '0.5rem 1.125rem', fontFamily: 'var(--font-outfit)', fontWeight: 700,
        fontSize: '0.8125rem', cursor: 'pointer', letterSpacing: '-0.01em',
        display: 'flex', alignItems: 'center', gap: '0.375rem',
      }}>
        <NeonIcon name="star" size={12} color="var(--primary-foreground)" />
        Upgrade
      </button>
    </div>
  )
}

function ChartCard({ title, subtitle, stat, statColor, badge, children }: {
  title: string; subtitle: string; stat: string; statColor: string; badge: string; children: React.ReactNode
}) {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'calc(var(--radius) + 4px)', padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--foreground)', marginBottom: '0.125rem' }}>{title}</h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--muted-foreground)' }}>{subtitle}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '1.25rem', color: statColor, letterSpacing: '-0.03em' }}>{stat}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--muted-foreground)', marginTop: '0.125rem' }}>{badge}</div>
        </div>
      </div>
      {children}
    </div>
  )
}