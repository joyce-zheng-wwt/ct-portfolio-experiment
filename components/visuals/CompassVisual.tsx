export default function CompassVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        .cmp-outer { transform-origin: 220px 220px; animation: slow-spin 60s linear infinite; }
        .cmp-mid { transform-origin: 220px 220px; animation: slow-spin-rev 40s linear infinite; }
        .cmp-inner { transform-origin: 220px 220px; animation: slow-spin 25s linear infinite; }
        .cmp-label { font-family: 'IBM Plex Mono', monospace; font-size: 9px; fill: rgba(117,26,46,0.7); letter-spacing: 0.12em; }
        .cmp-token { font-family: 'IBM Plex Mono', monospace; font-size: 8px; fill: rgba(33,6,117,0.6); letter-spacing: 0.08em; }
      `}</style>
      <svg viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '440px' }}>
        <g className="cmp-outer">
          <circle cx="220" cy="220" r="200" stroke="rgba(117,26,46,0.2)" strokeWidth="0.5" />
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180
            const x1 = 220 + 192 * Math.cos(angle)
            const y1 = 220 + 192 * Math.sin(angle)
            const x2 = 220 + 200 * Math.cos(angle)
            const y2 = 220 + 200 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(117,26,46,0.35)" strokeWidth={i % 9 === 0 ? 1 : 0.5} />
          })}
          {[[220, 20], [420, 220], [220, 420], [20, 220]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#751A2E" opacity="0.8" />
          ))}
        </g>
        <g className="cmp-mid">
          <circle cx="220" cy="220" r="150" stroke="rgba(117,26,46,0.25)" strokeWidth="0.5" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180
            const x1 = 220 + 144 * Math.cos(angle)
            const y1 = 220 + 144 * Math.sin(angle)
            const x2 = 220 + 150 * Math.cos(angle)
            const y2 = 220 + 150 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(117,26,46,0.3)" strokeWidth="0.5" />
          })}
        </g>
        <g className="cmp-inner">
          <circle cx="220" cy="220" r="96" stroke="rgba(33,6,117,0.3)" strokeWidth="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x1 = 220 + 88 * Math.cos(angle)
            const y1 = 220 + 88 * Math.sin(angle)
            const x2 = 220 + 96 * Math.cos(angle)
            const y2 = 220 + 96 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(33,6,117,0.4)" strokeWidth="0.75" />
          })}
        </g>
        <line x1="20" y1="220" x2="420" y2="220" stroke="rgba(117,26,46,0.1)" strokeWidth="0.5" />
        <line x1="220" y1="20" x2="220" y2="420" stroke="rgba(117,26,46,0.1)" strokeWidth="0.5" />
        <line x1="79" y1="79" x2="361" y2="361" stroke="rgba(117,26,46,0.06)" strokeWidth="0.5" />
        <line x1="361" y1="79" x2="79" y2="361" stroke="rgba(117,26,46,0.06)" strokeWidth="0.5" />
        <circle cx="220" cy="220" r="48" stroke="rgba(33,6,117,0.2)" strokeWidth="0.5" fill="rgba(33,6,117,0.03)" />
        <circle cx="220" cy="220" r="6" fill="#210675" opacity="0.5" />
        <text className="cmp-label" x="228" y="36" textAnchor="middle">NORTH</text>
        <text className="cmp-label" x="396" y="226">EAST</text>
        <text className="cmp-label" x="196" y="414">SOUTH</text>
        <text className="cmp-label" x="34" y="226">WEST</text>
        {[
          { x: 20, y: 8, text: 'color/bg/primary' },
          { x: 20, y: 18, text: 'color/text/default' },
          { x: 20, y: 28, text: 'spacing/md → 16px' },
          { x: 20, y: 38, text: 'radius/sm → 4px' },
        ].map((t, i) => (
          <text key={i} className="cmp-token" x={t.x} y={t.y + 390}>{t.text}</text>
        ))}
      </svg>
    </div>
  )
}
