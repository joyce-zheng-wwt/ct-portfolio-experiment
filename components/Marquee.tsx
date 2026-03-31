const items = [
  'Generative AI',
  'Interaction Design',
  'Intelligent Tooling',
  'Full-Stack Development',
  'Design Systems',
  'Workflow Automation',
  'Creative Engineering',
  'Applied Intelligence',
]

export default function Marquee() {
  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {all.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span className="dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
