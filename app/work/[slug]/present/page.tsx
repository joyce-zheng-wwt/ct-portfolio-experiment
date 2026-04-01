import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/lib/projects'
import PresentationShell from '@/components/presentation/PresentationShell'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = projects[slug]
  if (!p) return {}
  return {
    title: `${p.titleLines.join(' ')} — Present`,
  }
}

export default async function PresentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects[slug]
  if (!project) notFound()

  return <PresentationShell project={project} slug={slug} />
}
