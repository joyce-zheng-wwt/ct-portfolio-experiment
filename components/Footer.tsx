'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <span>© 2026 STUDIO — CT. ALL RIGHTS RESERVED.</span>
      <span className="status">SYS:ONLINE ● BUILD:2406</span>
      <Link
        href="/experiments"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--subtle)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--subtle)')}
      >
        EXPERIMENTS ↗
      </Link>
    </footer>
  )
}
