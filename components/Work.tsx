export default function Work() {
  return (
    <section className="work" id="work">
      <div className="section-header reveal">
        <span className="section-num">01</span>
        <span className="section-title">Selected Work</span>
        <div className="section-line" />
      </div>

      <div className="work-grid">
        {/* Item 1 — Signal Intelligence Platform */}
        <div className="work-item reveal">
          <div className="work-item-inner">
            <div className="work-item-visual">
              <svg className="visual-waveform" viewBox="0 0 600 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline
                  points="0,80 30,80 40,20 50,140 60,50 70,110 80,80 120,80 130,35 140,125 150,65 160,95 170,80 220,80 230,10 240,150 250,40 260,120 270,55 280,105 290,80 360,80 370,45 380,115 390,70 400,90 410,80 460,80 470,25 480,135 490,60 500,100 510,80 560,80 570,50 580,110 590,75 600,80"
                  stroke="#210675" strokeWidth="1.5" fill="none" opacity="0.6"
                />
                <line x1="0" y1="80" x2="600" y2="80" stroke="rgba(33,6,117,0.15)" strokeWidth="0.5" strokeDasharray="4,8" />
              </svg>
            </div>
            <div className="work-item-top">
              <div className="work-tag">AI Infrastructure</div>
              <h3 className="work-name">Signal<br />Intelligence<br />Platform</h3>
            </div>
            <div className="work-item-bottom">
              <p className="work-desc">Real-time data pipeline with AI-driven classification and anomaly detection.</p>
              <div className="work-arrow">↗</div>
            </div>
          </div>
        </div>

        {/* Item 2 — Compass Design OS */}
        <div className="work-item reveal reveal-delay-1">
          <div className="work-item-inner">
            <div className="work-item-visual">
              <svg className="visual-radial" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="110" cy="110" r="100" stroke="rgba(117,26,46,0.35)" strokeWidth="0.5" />
                <circle cx="110" cy="110" r="75" stroke="rgba(117,26,46,0.28)" strokeWidth="0.5" />
                <circle cx="110" cy="110" r="50" stroke="rgba(117,26,46,0.2)" strokeWidth="0.5" />
                <circle cx="110" cy="110" r="25" stroke="rgba(117,26,46,0.15)" strokeWidth="0.5" />
                <line x1="10" y1="110" x2="210" y2="110" stroke="rgba(117,26,46,0.15)" strokeWidth="0.5" />
                <line x1="110" y1="10" x2="110" y2="210" stroke="rgba(117,26,46,0.15)" strokeWidth="0.5" />
                <line x1="39" y1="39" x2="181" y2="181" stroke="rgba(117,26,46,0.1)" strokeWidth="0.5" />
                <line x1="181" y1="39" x2="39" y2="181" stroke="rgba(117,26,46,0.1)" strokeWidth="0.5" />
                <circle cx="110" cy="10" r="3" fill="#751A2E" opacity="0.7" />
                <circle cx="210" cy="110" r="3" fill="#751A2E" opacity="0.7" />
                <circle cx="110" cy="210" r="3" fill="#751A2E" opacity="0.5" />
                <circle cx="10" cy="110" r="3" fill="#751A2E" opacity="0.5" />
              </svg>
            </div>
            <div className="work-item-top">
              <div className="work-tag">Design System</div>
              <h3 className="work-name">Compass<br />Design OS</h3>
            </div>
            <div className="work-item-bottom">
              <p className="work-desc">Component library and token system powering 6 product surfaces.</p>
              <div className="work-arrow">↗</div>
            </div>
          </div>
        </div>

        {/* Item 3 — Process Architect */}
        <div className="work-item reveal reveal-delay-2">
          <div className="work-item-inner">
            <div className="work-item-visual">
              <svg viewBox="0 0 300 300" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dotgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="0.8" fill="rgba(33,6,117,0.4)" />
                  </pattern>
                </defs>
                <rect width="300" height="300" fill="url(#dotgrid)" />
                <rect x="60" y="60" width="180" height="180" stroke="rgba(33,6,117,0.25)" strokeWidth="0.5" fill="none" />
                <rect x="100" y="100" width="100" height="100" stroke="rgba(33,6,117,0.15)" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            <div className="work-item-top">
              <div className="work-tag">Automation</div>
              <h3 className="work-name">Process<br />Architect</h3>
            </div>
            <div className="work-item-bottom">
              <p className="work-desc">LLM-powered workflow engine for creative production pipelines.</p>
              <div className="work-arrow">↗</div>
            </div>
          </div>
        </div>

        {/* Item 4 — Foundation Model Interface */}
        <div className="work-item reveal reveal-delay-3">
          <div className="work-item-inner">
            <div className="work-item-visual">
              <svg viewBox="0 0 800 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="matrixFade" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#210675" stopOpacity="0" />
                    <stop offset="30%" stopColor="#210675" stopOpacity="0.6" />
                    <stop offset="70%" stopColor="#751A2E" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#751A2E" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <text x="20" y="30" fontFamily="DM Mono, monospace" fontSize="11" fill="url(#matrixFade)" opacity="0.9">01001101 01101111 01100100 01100101 01101100 00100000 01110100 01110010 01100001 01101001 01101110 01101001 01101110 01100111</text>
                <text x="20" y="60" fontFamily="DM Mono, monospace" fontSize="11" fill="url(#matrixFade)" opacity="0.7">token_embed → attention → ffn → norm → logits → sample → decode → stream</text>
                <text x="20" y="90" fontFamily="DM Mono, monospace" fontSize="11" fill="url(#matrixFade)" opacity="0.5">∑ w_i · x_i + b → σ(z) → ∇L(θ) → θ - α∇L(θ) → converge</text>
                <text x="20" y="120" fontFamily="DM Mono, monospace" fontSize="11" fill="url(#matrixFade)" opacity="0.4">context_window: 200k → retrieval: dense+sparse → rerank → synthesize → cite</text>
                <text x="20" y="150" fontFamily="DM Mono, monospace" fontSize="11" fill="url(#matrixFade)" opacity="0.3">01110100 01110010 01100001 01101110 01110011 01100110 01101111 01110010 01101101 00100000 01100001 01110010 01100011 01101000</text>
              </svg>
            </div>
            <div className="work-item-top">
              <div className="work-tag">LLM Tooling</div>
              <h3 className="work-name">Foundation<br />Model Interface</h3>
            </div>
            <div className="work-item-bottom">
              <p className="work-desc">Unified evaluation and prompt management layer across multiple model providers.</p>
              <div className="work-arrow">↗</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
