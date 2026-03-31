import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Experiments — STUDIO CT',
  description: 'Design and development experiments.',
}

const experiments = [
  {
    num: '01',
    name: 'Strand Studio',
    desc: 'Creative technology agency concept with interactive DNA helix.',
    href: '/experiments/1/',
  },
  {
    num: '02',
    name: 'Helix',
    desc: 'AI coding intelligence product with crystal DNA shader and starfield.',
    href: '/experiments/2/',
  },
  {
    num: '04',
    name: 'CT Studio',
    desc: 'Dark multi-page site with Three.js glass cube, work grid, and presentation mode.',
    href: '/experiments/4/',
  },
  {
    num: '05',
    name: 'CT Portfolio',
    desc: 'Creative Technology portfolio site (vanilla HTML/CSS/JS).',
    href: '/experiments/5/',
  },
  {
    num: '06',
    name: 'Design Direction Filter',
    desc: 'Design direction filter slide deck.',
    href: '/experiments/6/',
  },
]

export default function ExperimentsPage() {
  return (
    <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh', padding: '120px 48px 80px' }}>
      {/* Back link */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          textDecoration: 'none',
          marginBottom: '64px',
        }}
      >
        ← Back to Studio
      </Link>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '16px' }}>
        <span className="section-num">00</span>
        <span className="section-title">Experiments</span>
        <div className="section-line" />
      </div>
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          color: 'var(--muted)',
          fontStyle: 'italic',
          marginBottom: '64px',
          lineHeight: '1.7',
        }}
      >
        Earlier design directions explored before settling on this one.
      </p>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '2px',
          maxWidth: '1000px',
        }}
      >
        {experiments.map((exp) => (
          <a key={exp.num} href={exp.href} className="exp-card">
            <div>
              <p className="exp-num">{exp.num}</p>
              <p className="exp-name">{exp.name}</p>
              <p className="exp-desc">{exp.desc}</p>
            </div>
            <span className="exp-arrow">↗</span>
          </a>
        ))}
      </div>

      <style>{`
        .exp-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 28px;
          background: var(--surface);
          border: 1px solid var(--border);
          text-decoration: none;
          color: var(--text);
          transition: background 0.25s, border-color 0.25s;
          min-height: 180px;
          cursor: none;
        }
        .exp-card:hover {
          background: #e5e2df;
          border-color: rgba(33,6,117,0.3);
        }
        .exp-num {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.16em;
          color: var(--accent);
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .exp-name {
          font-family: var(--sans);
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
          color: var(--text);
        }
        .exp-desc {
          font-family: var(--mono);
          font-size: 11px;
          line-height: 1.65;
          color: var(--muted);
          font-style: italic;
        }
        .exp-arrow {
          align-self: flex-end;
          font-size: 1rem;
          color: var(--muted);
          transition: transform 0.2s, color 0.2s;
          margin-top: 16px;
        }
        .exp-card:hover .exp-arrow {
          transform: translate(3px, -3px);
          color: var(--accent-red);
        }
      `}</style>
    </main>
  )
}
