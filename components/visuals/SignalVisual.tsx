export default function SignalVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .sig-grid line { stroke: rgba(33,6,117,0.08); }
        .sig-wave { animation: wave-anim 8s linear infinite; }
        .sig-wave-2 { animation: wave-anim 12s linear infinite; }
        .sig-wave-3 { animation: wave-anim 6s linear infinite; }
        .sig-label { font-family: 'IBM Plex Mono', monospace; font-size: 9px; fill: rgba(33,6,117,0.5); letter-spacing: 0.15em; }
        .sig-val { font-family: 'IBM Plex Mono', monospace; font-size: 10px; fill: rgba(33,6,117,0.8); }
        .sig-pip { animation: flow-pulse 2.4s ease-in-out infinite; }
        .sig-pip-2 { animation: flow-pulse 3.2s ease-in-out infinite; animation-delay: 0.8s; }
        .sig-pip-3 { animation: flow-pulse 2s ease-in-out infinite; animation-delay: 1.6s; }
      `}</style>
      <svg viewBox="0 0 640 560" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <g className="sig-grid">
          {[0,80,160,240,320,400,480,560].map(y => <line key={y} x1="0" y1={y} x2="640" y2={y} />)}
          {[0,80,160,240,320,400,480,560,640].map(x => <line key={x} x1={x} y1="0" x2={x} y2="560" />)}
        </g>
        <rect x="40" y="40" width="560" height="480" stroke="rgba(33,6,117,0.12)" strokeWidth="0.5" />
        <g transform="translate(40, 120)">
          <text className="sig-label" x="0" y="-10">CH1 — SIGNAL FEED</text>
          <text className="sig-val" x="460" y="-10">2.48 MHz</text>
          <line x1="0" y1="40" x2="560" y2="40" stroke="rgba(33,6,117,0.1)" strokeWidth="0.5" strokeDasharray="2 6" />
          <g className="sig-wave" style={{ willChange: 'transform' }}>
            <polyline points="0,40 20,40 28,5 36,75 44,18 52,62 60,40 100,40 108,12 116,68 124,25 132,55 140,40 180,40 188,8 196,72 204,22 212,58 220,40 260,40 268,10 276,70 284,20 292,60 300,40 340,40 348,6 356,74 364,16 372,64 380,40 420,40 428,14 436,66 444,28 452,52 460,40 500,40 508,4 516,76 524,18 532,62 540,40 560,40" stroke="#210675" strokeWidth="1.5" fill="none" opacity="0.7" />
            <polyline points="560,40 580,40 588,5 596,75 604,18 612,62 620,40 660,40 668,12 676,68 684,25 692,55 700,40 740,40 748,8 756,72 764,22 772,58 780,40 820,40 828,10 836,70 844,20 852,60 860,40 900,40 908,6 916,74 924,16 932,64 940,40 980,40 988,14 996,66 1004,28 1012,52 1020,40 1060,40 1068,4 1076,76 1084,18 1092,62 1100,40 1120,40" stroke="#210675" strokeWidth="1.5" fill="none" opacity="0.7" />
          </g>
        </g>
        <g transform="translate(40, 260)">
          <text className="sig-label" x="0" y="-10">CH2 — ANOMALY DETECT</text>
          <text className="sig-val" x="460" y="-10">0.87 MHz</text>
          <line x1="0" y1="30" x2="560" y2="30" stroke="rgba(33,6,117,0.1)" strokeWidth="0.5" strokeDasharray="2 6" />
          <g className="sig-wave-2" style={{ willChange: 'transform' }}>
            <polyline points="0,30 40,30 60,8 80,52 100,18 120,42 140,30 200,30 220,4 240,56 260,14 280,46 300,30 360,30 380,10 400,50 420,20 440,40 460,30 520,30 540,6 560,54" stroke="#751A2E" strokeWidth="1" fill="none" opacity="0.55" />
            <polyline points="560,30 620,30 640,8 660,52 680,18 700,42 720,30 780,30 800,4 820,56 840,14 860,46 880,30 940,30 960,10 980,50 1000,20 1020,40 1040,30 1100,30 1120,6 1140,54" stroke="#751A2E" strokeWidth="1" fill="none" opacity="0.55" />
          </g>
          <circle cx="310" cy="30" r="4" fill="#751A2E" className="sig-pip" />
          <line x1="310" y1="0" x2="310" y2="60" stroke="#751A2E" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8px', fill: '#751A2E', letterSpacing: '0.1em' }} x="316" y="8">ANOMALY</text>
        </g>
        <g transform="translate(40, 390)">
          <text className="sig-label" x="0" y="-10">CH3 — BASELINE REF</text>
          <text className="sig-val" x="460" y="-10">0.12 MHz</text>
          <g className="sig-wave-3" style={{ willChange: 'transform' }}>
            <polyline points="0,20 80,20 100,10 120,30 160,20 240,20 260,12 280,28 320,20 400,20 420,8 440,32 480,20 560,20 580,16 600,24 640,20 720,20 740,10 760,30 800,20 880,20 900,12 920,28 960,20 1040,20 1060,8 1080,32 1120,20" stroke="#210675" strokeWidth="0.75" fill="none" opacity="0.3" />
          </g>
          <line x1="0" y1="20" x2="560" y2="20" stroke="rgba(33,6,117,0.06)" strokeWidth="0.5" />
        </g>
        <text className="sig-label" x="48" y="56">SAMPLE RATE: 10MS/S</text>
        <text className="sig-label" x="48" y="492">REC ●  12:04:38.224</text>
        <text className="sig-label" x="400" y="492">THRESHOLD: AUTO-ADAPT</text>
        <circle cx="44" cy="489" r="3" fill="#751A2E" className="sig-pip-2" />
      </svg>
    </div>
  )
}
