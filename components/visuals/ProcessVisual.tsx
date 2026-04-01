export default function ProcessVisual() {
  const nodes = [
    { id: 'brief', x: 40, y: 120, label: 'BRIEF', sub: 'HUMAN' },
    { id: 'parse', x: 180, y: 60, label: 'PARSE', sub: 'AI' },
    { id: 'gen', x: 320, y: 120, label: 'GENERATE', sub: 'AI' },
    { id: 'review', x: 460, y: 60, label: 'REVIEW', sub: 'HUMAN' },
    { id: 'revise', x: 460, y: 180, label: 'REVISE', sub: 'AI' },
    { id: 'deliver', x: 320, y: 240, label: 'DELIVER', sub: 'TOOL' },
  ]
  const edges = [
    [{ x: 120, y: 120 }, { x: 180, y: 90 }],
    [{ x: 120, y: 120 }, { x: 320, y: 120 }],
    [{ x: 260, y: 90 }, { x: 460, y: 70 }],
    [{ x: 400, y: 120 }, { x: 460, y: 90 }],
    [{ x: 400, y: 120 }, { x: 460, y: 170 }],
    [{ x: 460, y: 90 }, { x: 460, y: 170 }],
    [{ x: 460, y: 190 }, { x: 400, y: 240 }],
    [{ x: 320, y: 240 }, { x: 240, y: 240 }],
  ]
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .prc-node-ai { stroke: rgba(33,6,117,0.6); }
        .prc-node-human { stroke: rgba(117,26,46,0.6); }
        .prc-node-tool { stroke: rgba(33,6,117,0.35); }
        .prc-lbl { font-family: 'IBM Plex Mono', monospace; font-size: 8px; fill: rgba(33,6,117,0.8); letter-spacing: 0.12em; }
        .prc-sub { font-family: 'IBM Plex Mono', monospace; font-size: 7px; fill: rgba(33,6,117,0.45); letter-spacing: 0.1em; }
        .prc-edge { stroke: rgba(33,6,117,0.2); }
        .prc-flow { animation: flow-pulse 3s ease-in-out infinite; }
        .prc-flow-2 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 0.5s; }
        .prc-flow-3 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 1s; }
        .prc-flow-4 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 1.5s; }
        .prc-flow-5 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 2s; }
        .prc-flow-6 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 2.5s; }
      `}</style>
      <svg viewBox="0 0 600 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <pattern id="dotgrid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.7" fill="rgba(33,6,117,0.25)" />
          </pattern>
        </defs>
        <rect width="600" height="380" fill="url(#dotgrid2)" />
        <g transform="translate(30, 50) scale(1.1)">
          {edges.map(([a, b], i) => (
            <g key={i}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="prc-edge" strokeWidth="1" />
              <circle cx={(a.x + b.x) / 2} cy={(a.y + b.y) / 2} r="3" fill="#210675" className={`prc-flow prc-flow-${(i % 6) + 1}`} />
            </g>
          ))}
          {nodes.map(n => {
            const isAI = n.sub === 'AI'
            const isHuman = n.sub === 'HUMAN'
            return (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <rect x="-40" y="-20" width="80" height="40" fill="rgba(245,244,242,0.9)" className={isAI ? 'prc-node-ai' : isHuman ? 'prc-node-human' : 'prc-node-tool'} strokeWidth="0.75" />
                <text className="prc-lbl" x="0" y="-4" textAnchor="middle">{n.label}</text>
                <text className="prc-sub" x="0" y="9" textAnchor="middle">{n.sub}</text>
              </g>
            )
          })}
        </g>
        <rect x="20" y="320" width="560" height="40" fill="rgba(33,6,117,0.04)" stroke="rgba(33,6,117,0.1)" strokeWidth="0.5" />
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.5)', letterSpacing: '0.1em' }} x="32" y="344">PIPELINE:ACTIVE</text>
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(117,26,46,0.6)', letterSpacing: '0.1em' }} x="220" y="344">QUEUE: 3 TASKS PENDING</text>
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.4)', letterSpacing: '0.1em' }} x="450" y="344">UPTIME: 99.8%</text>
      </svg>
    </div>
  )
}
