import type { ProjectData } from '@/lib/projects'

export default function SlideOutcomes({ project: p }: { project: ProjectData }) {
  return (
    <div className="pres-outcomes-layout">
      <p className="pres-outcomes-label">Impact</p>
      <div className="pres-metric-grid">
        {p.outcomes.map((o, i) => (
          <div key={i} className="pres-metric-cell">
            <p className="pres-metric-value">{o.value}</p>
            <p className="pres-metric-label">{o.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
