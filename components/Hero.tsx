export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="hero-tag" style={{ color: 'var(--accent-red)' }}>
          Creative Technology — Est. 2024
        </div>
        <h1 className="hero-headline">
          <span style={{ color: 'var(--accent-red)', display: 'block' }}>Design that</span>
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px #751A2E', display: 'block' }}>thinks.</span>
          <span style={{ color: 'var(--accent-red)', display: 'block' }}>Code that feels.</span>
        </h1>
        <div className="hero-meta">
          <p className="hero-desc">
            A studio at the intersection of visual craft,<br />
            engineering precision, and applied intelligence —<br />
            shaping the tools and interfaces of what&apos;s next.
          </p>
          <div className="hero-coords">
            40.7128° N, 74.0060° W<br />
            SYS:ONLINE — BUILD:2406<br />
            THREADS: 12 / ACTIVE
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line" />
        Scroll to explore
        <div className="scroll-line" />
      </div>
    </section>
  )
}
