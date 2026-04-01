'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { ProjectData } from '@/lib/projects'
import { slugVisualMap } from '@/components/visuals'
import SlideTitle from './SlideTitle'
import SlideChallenge from './SlideChallenge'
import SlideSection from './SlideSection'
import SlideOutcomes from './SlideOutcomes'
import SlideClosing from './SlideClosing'

const TOTAL = 7

type AnimState = 'idle' | 'exiting' | 'entering'

export default function PresentationShell({
  project,
  slug,
}: {
  project: ProjectData
  slug: string
}) {
  const router = useRouter()
  const shellRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [anim, setAnim] = useState<AnimState>('entering')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pendingSlide, setPendingSlide] = useState<number | null>(null)

  const HeroVisual = slugVisualMap[slug]

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL || anim !== 'idle') return
    setPendingSlide(next)
    setAnim('exiting')
  }, [anim])

  function onAnimEnd() {
    if (anim === 'exiting' && pendingSlide !== null) {
      setSlide(pendingSlide)
      setPendingSlide(null)
      setAnim('entering')
    } else if (anim === 'entering') {
      setAnim('idle')
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goTo(slide + 1)
      } else if (e.key === 'ArrowLeft') {
        goTo(slide - 1)
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) document.exitFullscreen()
        router.back()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slide, goTo, router])

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      shellRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  function renderSlide() {
    if (slide === 0) return <SlideTitle project={project} slug={slug} theme={theme} Visual={HeroVisual} />
    if (slide === 1) return <SlideChallenge project={project} />
    if (slide === 2) return <SlideSection section={project.sections[0]} reversed={false} />
    if (slide === 3) return <SlideSection section={project.sections[1]} reversed={true} />
    if (slide === 4) return <SlideSection section={project.sections[2]} reversed={false} />
    if (slide === 5) return <SlideOutcomes project={project} />
    if (slide === 6) return <SlideClosing project={project} slug={slug} />
    return null
  }

  const counter = `${String(slide + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`
  const progressPct = ((slide + 1) / TOTAL) * 100

  return (
    <div ref={shellRef} className="pres-shell" data-theme={theme}>
      {/* Top bar */}
      <div className="pres-topbar">
        <div className="pres-nav-hint">← → navigate · space advance · esc exit</div>
        <div className="pres-controls">
          <button className="pres-btn" onClick={() => router.back()}>← Exit</button>
          <button className="pres-btn" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '◑ Dark' : '◐ Light'}
          </button>
          <button className="pres-btn" onClick={toggleFullscreen}>
            {isFullscreen ? '⊠ Exit Full' : '⛶ Fullscreen'}
          </button>
        </div>
      </div>

      {/* Slide */}
      <div
        key={slide}
        className={`pres-slide pres-${anim}`}
        onAnimationEnd={onAnimEnd}
      >
        {renderSlide()}
      </div>

      {/* Bottom bar */}
      <div className="pres-bottombar">
        <span />
        <div className="pres-counter">{counter}</div>
      </div>

      <div className="pres-progress">
        <div className="pres-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  )
}
