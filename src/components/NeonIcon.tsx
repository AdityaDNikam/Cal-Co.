interface Props {
  name: 'logo' | 'bolt' | 'chart' | 'target' | 'dumbbell' | 'fire' | 'water' | 'scale' | 'check' | 'circle' | 'star' | 'user' | 'goal'
  size?: number
  color?: string
}

export default function NeonIcon({ name, size = 20, color = '#b5ff4d' }: Props) {
  const s = size
  const props = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', style: { display: 'block', flexShrink: 0 } }

  switch (name) {
    case 'logo':
      return (
        <svg {...props}>
          <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...props}>
          <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...props}>
          <polyline points="3,17 8,10 13,14 19,6" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="3" y1="21" x2="21" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'target':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill={color} />
        </svg>
      )
    case 'dumbbell':
      return (
        <svg {...props}>
          <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
          <rect x="2" y="5" width="5" height="3.5" rx="1" stroke={color} strokeWidth="1.5" transform="rotate(-45 4.5 6.75)" />
          <rect x="17" y="15.5" width="5" height="3.5" rx="1" stroke={color} strokeWidth="1.5" transform="rotate(-45 19.5 17.25)" />
        </svg>
      )
    case 'fire':
      return (
        <svg {...props}>
          <path d="M12 2C12 2 8 6 8 10C8 11.5 8.5 12.5 9 13C9 13 9 11 11 10C11 12 10 14 8 16C7 17.1 7 18 7 19C7 21.2 9.2 22 12 22C14.8 22 17 21.2 17 19C17 17 15.5 15.5 14.5 14C13.5 12.5 13.5 11 14 10C15 11.5 15 13 15 13C15.5 12.5 16 11.5 16 10C16 6 12 2 12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'water':
      return (
        <svg {...props}>
          <path d="M12 3C12 3 6 10 6 14.5C6 17.5 8.7 20 12 20C15.3 20 18 17.5 18 14.5C18 10 12 3 12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'scale':
      return (
        <svg {...props}>
          <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="8" x2="12" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="8" x2="21" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 8C3 8 3 12 7.5 12C12 12 12 8 12 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 8C12 8 12 12 16.5 12C21 12 21 8 21 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="21" x2="15" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'check':
      return (
        <svg {...props}>
          <polyline points="4,12 9,17 20,6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'circle':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'star':
      return (
        <svg {...props}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
          <path d="M4 20C4 16.7 7.6 14 12 14C16.4 14 20 16.7 20 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'goal':
      return (
        <svg {...props}>
          <path d="M12 2L15 8.5L22 9.3L17 14L18.5 21L12 17.8L5.5 21L7 14L2 9.3L9 8.5L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}
