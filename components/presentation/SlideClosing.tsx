import type { ProjectData } from '@/lib/projects'

export default function SlideClosing({ project: p, slug }: { project: ProjectData; slug: string }) {
  return (
    <div className="pres-closing-layout">
      <h2 className="pres-closing-title">{p.titleLines.join('\n')}</h2>
      <p className="pres-closing-studio">Studio CT — Creative Technology</p>
      <p className="pres-closing-url">studio-ct.com/work/{slug}</p>
    </div>
  )
}
