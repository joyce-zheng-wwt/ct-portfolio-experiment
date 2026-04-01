'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PresentShortcut({ slug }: { slug: string }) {
  const router = useRouter()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'p' && e.key !== 'P') return
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      router.push(`/work/${slug}/present`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router, slug])

  return null
}
