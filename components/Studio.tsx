export default function Studio() {
  const capabilities = [
    'AI Product Design',
    'Generative Tooling',
    'Design Systems',
    'Full-Stack Development',
    'Workflow Automation',
    'Interaction Engineering',
    'Research + Prototyping',
  ]

  return (
    <section className="capabilities" id="capabilities">
      <div className="cap-left reveal">
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-num">02</span>
          <span className="section-title">Studio</span>
          <div className="section-line" />
        </div>
        <p className="cap-statement">
          We collapse the distance between<br />
          <em>an idea</em> and<br />
          a working thing.
        </p>
        <p className="cap-body">
          Our team is a rare synthesis — visual designers who write code,<br />
          engineers who obsess over aesthetics, and strategists who build.<br />
          We operate in the space where none of those roles cleanly fit.
        </p>
      </div>
      <div className="cap-right reveal reveal-delay-1">
        <ul className="cap-list">
          {capabilities.map((cap, i) => (
            <li key={cap}>
              <span>{cap}</span>
              <span className="cap-num">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
