import type { ProjectData } from '@/lib/projects'

type Props = {
  project: ProjectData
  slug: string
  theme: 'light' | 'dark'
  Visual: React.ComponentType<{ theme?: 'light' | 'dark' }>
}

export default function SlideTitle({ project: p, theme, Visual }: Props) {
  return (
    <div className="pres-title-layout">
      <div className="pres-title-left">
        <p className="pres-title-tag">{p.tag}</p>
        <h1 className="pres-title-headline">
          {p.titleLines.map((line, i) => (
            i === p.outlineIndex
              ? <span key={i} className="line-outline" style={{ display: 'block' }}>{line}</span>
              : <span key={i} style={{ display: 'block' }}>{line}</span>
          ))}
        </h1>
        <div className="pres-title-meta">
          <div className="pres-title-meta-item"><span>Year</span>{p.year}</div>
          <div className="pres-title-meta-item"><span>Role</span>{p.role}</div>
          <div className="pres-title-meta-item"><span>Status</span>{p.status}</div>
        </div>
      </div>
      <div className="pres-title-visual">
        <Visual theme={theme} />
      </div>
    </div>
  )
}
