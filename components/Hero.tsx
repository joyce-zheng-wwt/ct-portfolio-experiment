export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="hero-tag">Creative Technology — Est. 2024</div>
        <h1 className="hero-headline">
          We build<br />
          <span className="line-accent">what doesn&apos;t</span>
          <span className="line-accent" style={{ WebkitTextStroke: '1px rgba(117,26,46,0.3)' }}>exist yet.</span>
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
