export default function FoundationVisual({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const col1 = [
    '01001101 01101111 01100100',
    '01100101 01101100 00100000',
    '01110100 01110010 01100001',
    '01101001 01101110 01101001',
    '01101110 01100111 00100000',
    '01100100 01100001 01110100',
    '01100001 00100000 01110011',
    '01100101 01110100 00100000',
    '01110110 01100001 01101100',
    '01101001 01100100 01100001',
    '01110100 01100101 01100100',
    '01001101 01101111 01100100',
    '01100101 01101100 00100000',
    '01110100 01110010 01100001',
  ]
  const col2 = [
    'token_embed → attention',
    'ffn → norm → logits',
    'sample → decode → stream',
    'context_window: 200k',
    'retrieval: dense+sparse',
    'rerank → synthesize',
    'temperature: 0.7 → 1.0',
    'top_p: 0.95 | top_k: 40',
    'max_tokens: 4096',
    'system → user → assistant',
    'tool_call → tool_result',
    'finish_reason: stop',
    'token_embed → attention',
    'ffn → norm → logits',
  ]
  const col3 = [
    '∑ w_i · x_i + b → σ(z)',
    '∇L(θ) → θ − α∇L(θ)',
    'KL(p || q) = 0.042',
    'BLEU: 0.74 | ROUGE: 0.81',
    'perplexity: 12.4',
    'eval_score: 4.2 / 5.0',
    'latency_p50: 320ms',
    'latency_p99: 1.2s',
    'cost_per_1k: $0.003',
    'provider: anthropic/claude',
    'fallback: openai/gpt-4o',
    '∑ w_i · x_i + b → σ(z)',
    '∇L(θ) → θ − α∇L(θ)',
    'KL(p || q) = 0.042',
  ]

  const fadeColor = theme === 'dark' ? '#0d0d0d' : '#f5f4f2'

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .fmi-col1 { animation: matrix-scroll 18s linear infinite; }
        .fmi-col2 { animation: matrix-scroll 24s linear infinite; animation-delay: -6s; }
        .fmi-col3 { animation: matrix-scroll 14s linear infinite; animation-delay: -3s; }
        .fmi-text { font-family: 'IBM Plex Mono', monospace; font-size: 10px; fill: rgba(33,6,117,0.6); letter-spacing: 0.06em; }
        .fmi-text-r { font-family: 'IBM Plex Mono', monospace; font-size: 10px; fill: rgba(117,26,46,0.5); letter-spacing: 0.06em; }
        .fmi-text-m { font-family: 'IBM Plex Mono', monospace; font-size: 10px; fill: rgba(33,6,117,0.35); letter-spacing: 0.06em; }
      `}</style>
      <svg viewBox="0 0 640 560" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fadeColor} stopOpacity="1" />
            <stop offset="25%" stopColor={fadeColor} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="btmFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="75%" stopColor={fadeColor} stopOpacity="0" />
            <stop offset="100%" stopColor={fadeColor} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="matrixFade2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#210675" stopOpacity="0" />
            <stop offset="15%" stopColor="#210675" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#751A2E" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#751A2E" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Column dividers */}
        <line x1="213" y1="0" x2="213" y2="560" stroke="rgba(33,6,117,0.08)" strokeWidth="0.5" />
        <line x1="426" y1="0" x2="426" y2="560" stroke="rgba(33,6,117,0.08)" strokeWidth="0.5" />

        {/* Col 1 - binary */}
        <g className="fmi-col1" style={{ willChange: 'transform' }}>
          {[...col1, ...col1].map((t, i) => (
            <text key={i} className="fmi-text" x="16" y={24 + i * 28}>{t}</text>
          ))}
        </g>

        {/* Col 2 - token text */}
        <g className="fmi-col2" style={{ willChange: 'transform' }}>
          {[...col2, ...col2].map((t, i) => (
            <text key={i} className="fmi-text-r" x="228" y={36 + i * 28}>{t}</text>
          ))}
        </g>

        {/* Col 3 - math/metrics */}
        <g className="fmi-col3" style={{ willChange: 'transform' }}>
          {[...col3, ...col3].map((t, i) => (
            <text key={i} className="fmi-text-m" x="440" y={20 + i * 28}>{t}</text>
          ))}
        </g>

        {/* Fade masks */}
        <rect width="640" height="560" fill="url(#topFade)" />
        <rect width="640" height="560" fill="url(#btmFade)" />

        {/* Crosshair / active line */}
        <rect x="0" y="268" width="640" height="24" fill="rgba(33,6,117,0.04)" />
        <line x1="0" y1="268" x2="640" y2="268" stroke="rgba(33,6,117,0.15)" strokeWidth="0.5" />
        <line x1="0" y1="292" x2="640" y2="292" stroke="rgba(33,6,117,0.15)" strokeWidth="0.5" />
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.4)', letterSpacing: '0.1em' }} x="16" y="283">▶ EVALUATING PROMPT v2.14...</text>
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.3)', letterSpacing: '0.1em', animation: 'blink-cursor 1s step-end infinite' }} x="256" y="283">█</text>
      </svg>
    </div>
  )
}
