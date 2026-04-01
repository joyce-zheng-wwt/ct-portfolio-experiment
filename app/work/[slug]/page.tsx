import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealManager from '@/components/RevealManager'
import Footer from '@/components/Footer'
import PresentShortcut from '@/components/PresentShortcut'
import { projects } from '@/lib/projects'
import { slugVisualMap } from '@/components/visuals'

// ─── Section Visuals (inline — page-specific) ─────────────────────────────

function SectionVisual({ slug, sectionNum }: { slug: string; sectionNum: string }) {
  if (slug === 'signal-intelligence-platform') {
    if (sectionNum === '01') return (
      <div className="project-section-visual">
        <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
          {['REST', 'WEBSOCKET', 'BATCH'].map((src, i) => (
            <g key={src}>
              <rect x="20" y={40 + i * 80} width="100" height="32" fill="rgba(33,6,117,0.06)" stroke="rgba(33,6,117,0.25)" strokeWidth="0.75" />
              <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.7)', letterSpacing: '0.1em' }} x="70" y={60 + i * 80} textAnchor="middle">{src}</text>
              <line x1="120" y1={56 + i * 80} x2="220" y2="136" stroke="rgba(33,6,117,0.2)" strokeWidth="0.75" strokeDasharray="4 4" />
            </g>
          ))}
          <rect x="220" y="112" width="100" height="48" fill="rgba(33,6,117,0.08)" stroke="rgba(33,6,117,0.4)" strokeWidth="1" />
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: '#210675', letterSpacing: '0.1em' }} x="270" y="134" textAnchor="middle">KAFKA</text>
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8px', fill: 'rgba(33,6,117,0.5)', letterSpacing: '0.08em' }} x="270" y="148" textAnchor="middle">INGEST</text>
          <line x1="320" y1="136" x2="380" y2="136" stroke="rgba(33,6,117,0.3)" strokeWidth="1" />
          <rect x="380" y="112" width="80" height="48" fill="rgba(33,6,117,0.04)" stroke="rgba(33,6,117,0.2)" strokeWidth="0.75" />
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.6)', letterSpacing: '0.1em' }} x="420" y="140" textAnchor="middle">NORM</text>
        </svg>
      </div>
    )
  }
  if (slug === 'compass-design-os') {
    if (sectionNum === '01') return (
      <div className="project-section-visual">
        <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
          {[
            { y: 40, label: 'PRIMITIVES', vals: ['blue/500 = #3B82F6', 'gray/900 = #111827', 'spacing/4 = 16px'], color: 'rgba(33,6,117,0.1)' },
            { y: 120, label: 'SEMANTIC', vals: ['color/bg/primary → alias', 'color/text/default → alias', 'spacing/md → alias'], color: 'rgba(33,6,117,0.06)' },
            { y: 200, label: 'COMPONENT', vals: ['button/bg → semantic', 'button/text → semantic'], color: 'rgba(33,6,117,0.04)' },
          ].map(row => (
            <g key={row.label}>
              <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8px', fill: 'rgba(33,6,117,0.5)', letterSpacing: '0.15em' }} x="20" y={row.y}>{row.label}</text>
              <rect x="20" y={row.y + 6} width="440" height="56" fill={row.color} stroke="rgba(33,6,117,0.18)" strokeWidth="0.5" />
              {row.vals.map((v, vi) => (
                <text key={vi} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.7)', letterSpacing: '0.06em' }} x="32" y={row.y + 26 + vi * 14}>{v}</text>
              ))}
            </g>
          ))}
          <line x1="240" y1="98" x2="240" y2="120" stroke="rgba(33,6,117,0.3)" strokeWidth="0.75" markerEnd="url(#arr)" />
          <line x1="240" y1="178" x2="240" y2="200" stroke="rgba(33,6,117,0.3)" strokeWidth="0.75" />
        </svg>
      </div>
    )
  }
  return (
    <div className="project-section-visual">
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
        <defs>
          <pattern id={`dg-${slug}-${sectionNum}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.7" fill="rgba(33,6,117,0.3)" />
          </pattern>
        </defs>
        <rect width="480" height="280" fill={`url(#dg-${slug}-${sectionNum})`} />
        <rect x="40" y="40" width="400" height="200" stroke="rgba(33,6,117,0.2)" strokeWidth="0.5" fill="none" />
        <rect x="80" y="80" width="320" height="120" stroke="rgba(33,6,117,0.12)" strokeWidth="0.5" fill="none" />
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', fill: 'rgba(33,6,117,0.4)', letterSpacing: '0.15em' }} x="240" y="148" textAnchor="middle">{sectionNum}</text>
      </svg>
    </div>
  )
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = projects[slug]
  if (!p) return {}
  return {
    title: `${p.titleLines.join(' ')} — STUDIO CT`,
    description: p.overviewBody,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = projects[slug]
  if (!p) notFound()

  const HeroVisual = slugVisualMap[slug]

  return (
    <>
      <RevealManager />
      <PresentShortcut slug={slug} />

      {/* Nav */}
      <nav className="project-nav">
        <Link href="/#work" className="project-nav-back">
          ← Work
        </Link>
        <div className="project-nav-id">
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.15em' }}>◈</span>
          {' '}
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--subtle)' }}>STUDIO — CT</span>
        </div>
        <Link href={`/work/${slug}/present`} className="project-nav-present">
          Present ↗
        </Link>
      </nav>

      {/* Hero */}
      <section className="project-hero">
        <div className="project-hero-content">
          <p className="project-breadcrumb">{p.num} / Selected Work</p>
          <p className="project-cat">{p.tag}</p>
          <h1 className="project-headline">
            {p.titleLines.map((line, i) => (
              i === p.outlineIndex
                ? <span key={i} className="line-outline">{line}</span>
                : <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h1>
          <div className="project-meta-row">
            <div className="project-meta-item">
              <p className="project-meta-label">Year</p>
              <p className="project-meta-value">{p.year}</p>
            </div>
            <div className="project-meta-item">
              <p className="project-meta-label">Role</p>
              <p className="project-meta-value">{p.role}</p>
            </div>
            <div className="project-meta-item">
              <p className="project-meta-label">Status</p>
              <p className="project-meta-value">{p.status}</p>
            </div>
          </div>
        </div>

        <div className="project-hero-visual">
          {HeroVisual && <HeroVisual />}
        </div>
      </section>

      {/* Deliverables strip */}
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '18px 48px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--subtle)', textTransform: 'uppercase' }}>Deliverables</span>
        <span style={{ width: '24px', height: '1px', background: 'var(--border)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)' }}>{p.deliverables}</span>
      </div>

      {/* Overview */}
      <section className="project-overview">
        <div className="reveal">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-num">00</span>
            <span className="section-title">Overview</span>
            <div className="section-line" />
          </div>
          <p className="project-overview-statement">
            {p.challengeSegments.map((s, i) => s.em ? <em key={i}>{s.text}</em> : s.text)}
          </p>
        </div>
        <div className="project-overview-body reveal reveal-delay-1">
          <p className="project-overview-text">{p.overviewBody}</p>
          <ul className="project-spec-list">
            {p.specs.map(s => (
              <li key={s.label}>
                <span>{s.label}</span>
                <span>{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Content sections */}
      {p.sections.map((sec, i) => (
        <section key={sec.num} className={`project-section${i % 2 === 1 ? ' reversed' : ''}`}>
          <div className="reveal">
            <div className="section-header" style={{ marginBottom: '32px' }}>
              <span className="section-num">{sec.num}</span>
              <span className="section-title">{sec.title}</span>
              <div className="section-line" />
            </div>
            <h2 className="project-section-heading">{sec.title}</h2>
            <p className="project-section-body">{sec.body}</p>
          </div>
          <div className="reveal reveal-delay-1">
            <SectionVisual slug={slug} sectionNum={sec.num} />
          </div>
        </section>
      ))}

      {/* Outcomes */}
      <section className="project-outcomes">
        <div className="section-header reveal">
          <span className="section-num">04</span>
          <span className="section-title">Impact</span>
          <div className="section-line" />
        </div>
        <div className="project-outcome-grid">
          {p.outcomes.map((o, i) => (
            <div key={i} className={`project-outcome-cell reveal reveal-delay-${i}`}>
              <p className="project-outcome-value">{o.value}</p>
              <p className="project-outcome-label">{o.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next project */}
      <div className="next-project reveal">
        <Link href={`/work/${p.nextSlug}`} className="next-project-link">
          <div>
            <p className="next-project-eyebrow">Next Project</p>
            <p className="next-project-title">{p.nextTitle}</p>
          </div>
          <div className="next-project-arrow">↗</div>
        </Link>
      </div>

      <Footer />
    </>
  )
}
