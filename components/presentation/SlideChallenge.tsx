import type { ProjectData } from '@/lib/projects'

export default function SlideChallenge({ project: p }: { project: ProjectData }) {
  return (
    <div className="pres-challenge-layout">
      <p className="pres-challenge-label">Challenge</p>
      <p className="pres-challenge-statement">
        {p.challengeSegments.map((s, i) =>
          s.em ? <em key={i}>{s.text}</em> : s.text
        )}
      </p>
      <div className="pres-spec-grid">
        {p.specs.map(s => (
          <div key={s.label} className="pres-spec-cell">
            <p className="pres-spec-label">{s.label}</p>
            <p className="pres-spec-value">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
