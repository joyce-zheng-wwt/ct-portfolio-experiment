import type { Section } from '@/lib/projects'

type Props = {
  section: Section
  reversed?: boolean
}

export default function SlideSection({ section: s, reversed = false }: Props) {
  return (
    <div className={`pres-section-layout${reversed ? ' reversed' : ''}`}>
      <div className="pres-section-left">
        <p className="pres-section-num">{s.num}</p>
        <h2 className="pres-section-title">{s.title}</h2>
        <p className="pres-section-body">{s.body}</p>
      </div>
      <div className="pres-section-visual">
        <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <defs>
            <pattern id={`pres-dot-${s.num}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.7" fill="rgba(33,6,117,0.25)" />
            </pattern>
          </defs>
          <rect width="480" height="320" fill={`url(#pres-dot-${s.num})`} />
          <rect x="40" y="40" width="400" height="240" stroke="rgba(33,6,117,0.2)" strokeWidth="0.5" fill="none" />
          <rect x="80" y="80" width="320" height="160" stroke="rgba(33,6,117,0.1)" strokeWidth="0.5" fill="none" />
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '48px', fill: 'rgba(33,6,117,0.08)', letterSpacing: '-0.02em' }} x="240" y="180" textAnchor="middle">{s.num}</text>
        </svg>
      </div>
    </div>
  )
}
