import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import RevealManager from '@/components/RevealManager'
import Footer from '@/components/Footer'


type Outcome = { value: string; label: string }
type Section = { num: string; title: string; body: string }

type Project = {
  num: string
  tag: string
  titleLines: string[]
  outlineIndex: number
  year: string
  role: string
  deliverables: string
  status: string
  challengeStatement: ReactNode
  overviewBody: string
  specs: Array<{ label: string; value: string }>
  sections: Section[]
  outcomes: Outcome[]
  nextSlug: string
  nextTitle: string
}

const projects: Record<string, Project> = {
  'signal-intelligence-platform': {
    num: '01',
    tag: 'AI Infrastructure',
    titleLines: ['Signal', 'Intelligence', 'Platform'],
    outlineIndex: 1,
    year: '2024',
    role: 'Creative Technology Lead',
    deliverables: 'Architecture · UI System · Data Viz',
    status: 'Deployed — Production',
    challengeStatement: (
      <>
        A financial client had 14 disparate signal streams with <em>no unified classification layer</em> — analysts were drowning in noise.
      </>
    ),
    overviewBody:
      'We designed and built a real-time signal intelligence platform that ingests, normalizes, and classifies 2M+ data points daily across heterogeneous sources. AI-driven anomaly detection surfaces critical events to analysts within 340ms, reducing false-positive fatigue by 80%.',
    specs: [
      { label: 'Timeline', value: '6 months' },
      { label: 'Stack', value: 'Kafka · PyTorch · Next.js · Postgres' },
      { label: 'Team', value: '3 engineers · 1 designer' },
      { label: 'Client', value: 'Financial Services (NDA)' },
    ],
    sections: [
      {
        num: '01',
        title: 'Data Ingestion',
        body: 'Built a Kafka-based ingestion layer normalizing signals across REST, WebSocket, and batch file sources into a unified schema. Each stream is fingerprinted and tagged at ingest — enabling downstream models to classify without source-specific logic. Throughput scales horizontally to 10M+ signals/day.',
      },
      {
        num: '02',
        title: 'Classification Engine',
        body: 'Fine-tuned a transformer-based classifier on 18 months of labeled signal history. The model operates on windowed feature vectors, returning structured labels with calibrated confidence scores. Uncertain signals route to a human-in-the-loop queue with priority weighting and analyst feedback loops.',
      },
      {
        num: '03',
        title: 'Analyst Interface',
        body: 'Designed a real-time dashboard surfacing live signal streams, anomaly flags, and drill-down waveform views. Configurable alert thresholds, team annotations, and one-click export gave analysts direct ownership of their workflow — reducing escalation time from 4 hours to under 20 minutes.',
      },
    ],
    outcomes: [
      { value: '2M+', label: 'Signals / day' },
      { value: '94%', label: 'Classification accuracy' },
      { value: '340ms', label: 'p99 latency' },
      { value: '80%', label: 'False-positive reduction' },
    ],
    nextSlug: 'compass-design-os',
    nextTitle: 'Compass Design OS',
  },

  'compass-design-os': {
    num: '02',
    tag: 'Design System',
    titleLines: ['Compass', 'Design OS'],
    outlineIndex: 0,
    year: '2023–2024',
    role: 'Design Systems Lead',
    deliverables: 'Token Library · Component System · Docs',
    status: 'Active — v2.4',
    challengeStatement: (
      <>
        Six product teams diverging in visual language and component patterns — creating <em>3× rework cost</em> every time a design decision changed centrally.
      </>
    ),
    overviewBody:
      'Compass is an end-to-end design operating system: semantic token layer, 84 production-grade components, and a live documentation site — all kept in sync between Figma and code. It powers six product surfaces across three brand themes without a single hardcoded color.',
    specs: [
      { label: 'Timeline', value: '14 months (ongoing)' },
      { label: 'Stack', value: 'Figma · React · TypeScript · Storybook' },
      { label: 'Team', value: '2 designers · 4 engineers' },
      { label: 'Coverage', value: '6 product surfaces' },
    ],
    sections: [
      {
        num: '01',
        title: 'Token Architecture',
        body: 'Established a three-tier token hierarchy: primitive values (raw hex, spacing units) → semantic aliases (color/bg/primary) → component-scoped overrides. Figma Variables and CSS custom properties stay in sync via a code-generation pipeline — changing a token in Figma propagates to production in one PR.',
      },
      {
        num: '02',
        title: 'Component Library',
        body: '84 components spanning Button through DataTable, each built across up to 6 variant axes (Size, Style, State, Density, Brand, Theme). Zero external dependencies. Every component ships with full WCAG 2.1 AA compliance, keyboard navigation, and screen-reader semantics as baseline requirements.',
      },
      {
        num: '03',
        title: 'Adoption Strategy',
        body: 'Ran a "Strangler Fig" migration: new screens used Compass from day one; legacy code was incrementally replaced via automated codemods. A team health dashboard tracked adoption rate by surface, surfacing regressions before they spread. 100% adoption across all six surfaces in 9 months.',
      },
    ],
    outcomes: [
      { value: '84', label: 'Components' },
      { value: '6', label: 'Product surfaces' },
      { value: '60%', label: 'Reduced design debt' },
      { value: '3', label: 'Brand themes' },
    ],
    nextSlug: 'process-architect',
    nextTitle: 'Process Architect',
  },

  'process-architect': {
    num: '03',
    tag: 'Automation',
    titleLines: ['Process', 'Architect'],
    outlineIndex: 1,
    year: '2024',
    role: 'Engineering + Design',
    deliverables: 'Workflow Engine · LLM Integration · Operator UI',
    status: 'Internal Tool — 5 Active Pipelines',
    challengeStatement: (
      <>
        A media studio had <em>14 manual handoff steps</em> between creative brief and final delivery — with zero visibility into where work actually stalled.
      </>
    ),
    overviewBody:
      'Process Architect is a visual workflow engine for creative production pipelines — where each step can be executed by a human, an LLM, or an external tool, with full audit trail and real-time operator control. It reduced the studio\'s 14-step process to 3 automated stages.',
    specs: [
      { label: 'Timeline', value: '4 months' },
      { label: 'Stack', value: 'Python · Next.js · Claude API · Postgres' },
      { label: 'Team', value: '2 engineers · 1 designer' },
      { label: 'Client', value: 'Media Production Studio' },
    ],
    sections: [
      {
        num: '01',
        title: 'Workflow Model',
        body: 'Designed a DAG-based task graph where each node is typed: HUMAN (requires manual action), AI (routed to an LLM), or TOOL (calls an external API). Edges carry typed data contracts — ensuring outputs match expected schemas before the next step runs. The entire graph is defined in YAML and version-controlled.',
      },
      {
        num: '02',
        title: 'LLM Integration',
        body: 'Built a task-routing layer that selects the optimal model (Claude, GPT-4, Gemini) based on task type, context length, and cost constraints. Structured output schemas enforce consistent formats across providers. Failed LLM steps automatically retry with a simplified prompt before escalating to a human queue.',
      },
      {
        num: '03',
        title: 'Operator Interface',
        body: 'The operator view gives studio managers a live graph of every pipeline in flight — color-coded by status, with drill-down into individual task inputs/outputs. Manual override at any node, full audit trail with timestamps, and exportable compliance reports made it immediately useful to both creative and ops teams.',
      },
    ],
    outcomes: [
      { value: '14→3', label: 'Handoff steps' },
      { value: '68%', label: 'Time reduction' },
      { value: '100%', label: 'Audit coverage' },
      { value: '5', label: 'Active pipelines' },
    ],
    nextSlug: 'foundation-model-interface',
    nextTitle: 'Foundation Model Interface',
  },

  'foundation-model-interface': {
    num: '04',
    tag: 'LLM Tooling',
    titleLines: ['Foundation', 'Model', 'Interface'],
    outlineIndex: 2,
    year: '2024',
    role: 'Full-Stack + Research',
    deliverables: 'Eval Framework · Prompt CMS · Provider API',
    status: 'Active — v1.8',
    challengeStatement: (
      <>
        Teams managing prompts in spreadsheets and running <em>ad-hoc evaluations per provider</em> — impossible to improve quality or migrate models systematically.
      </>
    ),
    overviewBody:
      'A unified prompt management and evaluation platform that abstracts over OpenAI, Anthropic, Google, and Mistral behind a single API surface. Teams version-control their prompts, run structured evals, and migrate providers in under 2 hours — with full quality regression tracking.',
    specs: [
      { label: 'Timeline', value: '5 months (ongoing)' },
      { label: 'Stack', value: 'Python · FastAPI · React · Postgres · Redis' },
      { label: 'Team', value: '3 engineers · 1 researcher' },
      { label: 'Prompts managed', value: '1,200+' },
    ],
    sections: [
      {
        num: '01',
        title: 'Evaluation Framework',
        body: 'Built a dual-track evaluation system: LLM-as-judge (using a separate frontier model to score outputs on structured rubrics) and human evaluation with a custom labeling interface. Results feed a regression tracker that flags quality drops before they reach production — with email + Slack alerts on score deltas.',
      },
      {
        num: '02',
        title: 'Prompt Management',
        body: 'A version-controlled prompt library with variable injection, A/B testing, and a visual diff view between prompt versions. Prompts are organized by task type, model, and team — with access controls and review workflows. Every production prompt has an associated eval suite that runs on every commit.',
      },
      {
        num: '03',
        title: 'Provider Abstraction',
        body: 'A unified inference API translates a single request format into provider-native payloads across OpenAI, Anthropic, Google, and Mistral. Automatic fallback routing on rate limits or failures. Streaming, function calling, and structured output are supported uniformly. Migrating between providers requires changing one config value.',
      },
    ],
    outcomes: [
      { value: '4', label: 'Providers unified' },
      { value: '1,200+', label: 'Prompts managed' },
      { value: '40%', label: 'Quality improvement' },
      { value: '<2h', label: 'Provider migration time' },
    ],
    nextSlug: 'signal-intelligence-platform',
    nextTitle: 'Signal Intelligence Platform',
  },
}

// ─── Hero Visuals ──────────────────────────────────────────────────────────

function SignalVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .sig-grid line { stroke: rgba(33,6,117,0.08); }
        .sig-wave { animation: wave-anim 8s linear infinite; }
        .sig-wave-2 { animation: wave-anim 12s linear infinite; }
        .sig-wave-3 { animation: wave-anim 6s linear infinite; }
        .sig-label { font-family: 'IBM Plex Mono', monospace; font-size: 9px; fill: rgba(33,6,117,0.5); letter-spacing: 0.15em; }
        .sig-val { font-family: 'IBM Plex Mono', monospace; font-size: 10px; fill: rgba(33,6,117,0.8); }
        .sig-pip { animation: flow-pulse 2.4s ease-in-out infinite; }
        .sig-pip-2 { animation: flow-pulse 3.2s ease-in-out infinite; animation-delay: 0.8s; }
        .sig-pip-3 { animation: flow-pulse 2s ease-in-out infinite; animation-delay: 1.6s; }
      `}</style>
      <svg viewBox="0 0 640 560" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Grid */}
        <g className="sig-grid">
          {[0,80,160,240,320,400,480,560].map(y => <line key={y} x1="0" y1={y} x2="640" y2={y} />)}
          {[0,80,160,240,320,400,480,560,640].map(x => <line key={x} x1={x} y1="0" x2={x} y2="560" />)}
        </g>

        {/* Frame border */}
        <rect x="40" y="40" width="560" height="480" stroke="rgba(33,6,117,0.12)" strokeWidth="0.5" />

        {/* CH1 — main waveform */}
        <g transform="translate(40, 120)">
          <text className="sig-label" x="0" y="-10">CH1 — SIGNAL FEED</text>
          <text className="sig-val" x="460" y="-10">2.48 MHz</text>
          <line x1="0" y1="40" x2="560" y2="40" stroke="rgba(33,6,117,0.1)" strokeWidth="0.5" strokeDasharray="2 6" />
          <g className="sig-wave" style={{ willChange: 'transform' }}>
            <polyline
              points="0,40 20,40 28,5 36,75 44,18 52,62 60,40 100,40 108,12 116,68 124,25 132,55 140,40 180,40 188,8 196,72 204,22 212,58 220,40 260,40 268,10 276,70 284,20 292,60 300,40 340,40 348,6 356,74 364,16 372,64 380,40 420,40 428,14 436,66 444,28 452,52 460,40 500,40 508,4 516,76 524,18 532,62 540,40 560,40"
              stroke="#210675" strokeWidth="1.5" fill="none" opacity="0.7"
            />
            <polyline
              points="560,40 580,40 588,5 596,75 604,18 612,62 620,40 660,40 668,12 676,68 684,25 692,55 700,40 740,40 748,8 756,72 764,22 772,58 780,40 820,40 828,10 836,70 844,20 852,60 860,40 900,40 908,6 916,74 924,16 932,64 940,40 980,40 988,14 996,66 1004,28 1012,52 1020,40 1060,40 1068,4 1076,76 1084,18 1092,62 1100,40 1120,40"
              stroke="#210675" strokeWidth="1.5" fill="none" opacity="0.7"
            />
          </g>
        </g>

        {/* CH2 — secondary wave */}
        <g transform="translate(40, 260)">
          <text className="sig-label" x="0" y="-10">CH2 — ANOMALY DETECT</text>
          <text className="sig-val" x="460" y="-10">0.87 MHz</text>
          <line x1="0" y1="30" x2="560" y2="30" stroke="rgba(33,6,117,0.1)" strokeWidth="0.5" strokeDasharray="2 6" />
          <g className="sig-wave-2" style={{ willChange: 'transform' }}>
            <polyline
              points="0,30 40,30 60,8 80,52 100,18 120,42 140,30 200,30 220,4 240,56 260,14 280,46 300,30 360,30 380,10 400,50 420,20 440,40 460,30 520,30 540,6 560,54"
              stroke="#751A2E" strokeWidth="1" fill="none" opacity="0.55"
            />
            <polyline
              points="560,30 620,30 640,8 660,52 680,18 700,42 720,30 780,30 800,4 820,56 840,14 860,46 880,30 940,30 960,10 980,50 1000,20 1020,40 1040,30 1100,30 1120,6 1140,54"
              stroke="#751A2E" strokeWidth="1" fill="none" opacity="0.55"
            />
          </g>
          {/* Anomaly spike */}
          <circle cx="310" cy="30" r="4" fill="#751A2E" className="sig-pip" />
          <line x1="310" y1="0" x2="310" y2="60" stroke="#751A2E" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8px', fill: '#751A2E', letterSpacing: '0.1em' }} x="316" y="8">ANOMALY</text>
        </g>

        {/* CH3 — baseline */}
        <g transform="translate(40, 390)">
          <text className="sig-label" x="0" y="-10">CH3 — BASELINE REF</text>
          <text className="sig-val" x="460" y="-10">0.12 MHz</text>
          <g className="sig-wave-3" style={{ willChange: 'transform' }}>
            <polyline
              points="0,20 80,20 100,10 120,30 160,20 240,20 260,12 280,28 320,20 400,20 420,8 440,32 480,20 560,20 580,16 600,24 640,20 720,20 740,10 760,30 800,20 880,20 900,12 920,28 960,20 1040,20 1060,8 1080,32 1120,20"
              stroke="#210675" strokeWidth="0.75" fill="none" opacity="0.3"
            />
          </g>
          <line x1="0" y1="20" x2="560" y2="20" stroke="rgba(33,6,117,0.06)" strokeWidth="0.5" />
        </g>

        {/* Corner readouts */}
        <text className="sig-label" x="48" y="56">SAMPLE RATE: 10MS/S</text>
        <text className="sig-label" x="48" y="492">REC ●  12:04:38.224</text>
        <text className="sig-label" x="400" y="492">THRESHOLD: AUTO-ADAPT</text>
        <circle cx="44" cy="489" r="3" fill="#751A2E" className="sig-pip-2" />
      </svg>
    </div>
  )
}

function CompassVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        .cmp-outer { transform-origin: 220px 220px; animation: slow-spin 60s linear infinite; }
        .cmp-mid { transform-origin: 220px 220px; animation: slow-spin-rev 40s linear infinite; }
        .cmp-inner { transform-origin: 220px 220px; animation: slow-spin 25s linear infinite; }
        .cmp-label { font-family: 'IBM Plex Mono', monospace; font-size: 9px; fill: rgba(117,26,46,0.7); letter-spacing: 0.12em; }
        .cmp-token { font-family: 'IBM Plex Mono', monospace; font-size: 8px; fill: rgba(33,6,117,0.6); letter-spacing: 0.08em; }
      `}</style>
      <svg viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '440px' }}>
        {/* Outer ring */}
        <g className="cmp-outer">
          <circle cx="220" cy="220" r="200" stroke="rgba(117,26,46,0.2)" strokeWidth="0.5" />
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180
            const x1 = 220 + 192 * Math.cos(angle)
            const y1 = 220 + 192 * Math.sin(angle)
            const x2 = 220 + 200 * Math.cos(angle)
            const y2 = 220 + 200 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(117,26,46,0.35)" strokeWidth={i % 9 === 0 ? 1 : 0.5} />
          })}
          {/* Cardinal dots */}
          {[[220, 20], [420, 220], [220, 420], [20, 220]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#751A2E" opacity="0.8" />
          ))}
        </g>

        {/* Mid ring */}
        <g className="cmp-mid">
          <circle cx="220" cy="220" r="150" stroke="rgba(117,26,46,0.25)" strokeWidth="0.5" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180
            const x1 = 220 + 144 * Math.cos(angle)
            const y1 = 220 + 144 * Math.sin(angle)
            const x2 = 220 + 150 * Math.cos(angle)
            const y2 = 220 + 150 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(117,26,46,0.3)" strokeWidth="0.5" />
          })}
        </g>

        {/* Inner ring */}
        <g className="cmp-inner">
          <circle cx="220" cy="220" r="96" stroke="rgba(33,6,117,0.3)" strokeWidth="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x1 = 220 + 88 * Math.cos(angle)
            const y1 = 220 + 88 * Math.sin(angle)
            const x2 = 220 + 96 * Math.cos(angle)
            const y2 = 220 + 96 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(33,6,117,0.4)" strokeWidth="0.75" />
          })}
        </g>

        {/* Static crosshairs */}
        <line x1="20" y1="220" x2="420" y2="220" stroke="rgba(117,26,46,0.1)" strokeWidth="0.5" />
        <line x1="220" y1="20" x2="220" y2="420" stroke="rgba(117,26,46,0.1)" strokeWidth="0.5" />
        <line x1="79" y1="79" x2="361" y2="361" stroke="rgba(117,26,46,0.06)" strokeWidth="0.5" />
        <line x1="361" y1="79" x2="79" y2="361" stroke="rgba(117,26,46,0.06)" strokeWidth="0.5" />

        {/* Core */}
        <circle cx="220" cy="220" r="48" stroke="rgba(33,6,117,0.2)" strokeWidth="0.5" fill="rgba(33,6,117,0.03)" />
        <circle cx="220" cy="220" r="6" fill="#210675" opacity="0.5" />

        {/* Token labels */}
        <text className="cmp-label" x="228" y="36" textAnchor="middle">NORTH</text>
        <text className="cmp-label" x="396" y="226">EAST</text>
        <text className="cmp-label" x="196" y="414">SOUTH</text>
        <text className="cmp-label" x="34" y="226">WEST</text>

        {/* Corner token grid */}
        {[
          { x: 20, y: 8, text: 'color/bg/primary' },
          { x: 20, y: 18, text: 'color/text/default' },
          { x: 20, y: 28, text: 'spacing/md → 16px' },
          { x: 20, y: 38, text: 'radius/sm → 4px' },
        ].map((t, i) => (
          <text key={i} className="cmp-token" x={t.x} y={t.y + 390}>{t.text}</text>
        ))}
      </svg>
    </div>
  )
}

function ProcessVisual() {
  const nodes = [
    { id: 'brief', x: 40, y: 120, label: 'BRIEF', sub: 'HUMAN' },
    { id: 'parse', x: 180, y: 60, label: 'PARSE', sub: 'AI' },
    { id: 'gen', x: 320, y: 120, label: 'GENERATE', sub: 'AI' },
    { id: 'review', x: 460, y: 60, label: 'REVIEW', sub: 'HUMAN' },
    { id: 'revise', x: 460, y: 180, label: 'REVISE', sub: 'AI' },
    { id: 'deliver', x: 320, y: 240, label: 'DELIVER', sub: 'TOOL' },
  ]
  const edges = [
    [{ x: 120, y: 120 }, { x: 180, y: 90 }],
    [{ x: 120, y: 120 }, { x: 320, y: 120 }],
    [{ x: 260, y: 90 }, { x: 460, y: 70 }],
    [{ x: 400, y: 120 }, { x: 460, y: 90 }],
    [{ x: 400, y: 120 }, { x: 460, y: 170 }],
    [{ x: 460, y: 90 }, { x: 460, y: 170 }],
    [{ x: 460, y: 190 }, { x: 400, y: 240 }],
    [{ x: 320, y: 240 }, { x: 240, y: 240 }],
  ]
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .prc-dot { fill: url(#dotgrid2); }
        .prc-node-ai { stroke: rgba(33,6,117,0.6); }
        .prc-node-human { stroke: rgba(117,26,46,0.6); }
        .prc-node-tool { stroke: rgba(33,6,117,0.35); }
        .prc-lbl { font-family: 'IBM Plex Mono', monospace; font-size: 8px; fill: rgba(33,6,117,0.8); letter-spacing: 0.12em; }
        .prc-sub { font-family: 'IBM Plex Mono', monospace; font-size: 7px; fill: rgba(33,6,117,0.45); letter-spacing: 0.1em; }
        .prc-edge { stroke: rgba(33,6,117,0.2); }
        .prc-flow { animation: flow-pulse 3s ease-in-out infinite; }
        .prc-flow-2 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 0.5s; }
        .prc-flow-3 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 1s; }
        .prc-flow-4 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 1.5s; }
        .prc-flow-5 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 2s; }
        .prc-flow-6 { animation: flow-pulse 3s ease-in-out infinite; animation-delay: 2.5s; }
      `}</style>
      <svg viewBox="0 0 600 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <pattern id="dotgrid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.7" fill="rgba(33,6,117,0.25)" />
          </pattern>
        </defs>
        <rect width="600" height="380" fill="url(#dotgrid2)" />

        {/* Scale up the node diagram */}
        <g transform="translate(30, 50) scale(1.1)">
          {/* Edges */}
          {edges.map(([a, b], i) => (
            <g key={i}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="prc-edge" strokeWidth="1" />
              <circle
                cx={(a.x + b.x) / 2} cy={(a.y + b.y) / 2} r="3"
                fill="#210675"
                className={`prc-flow prc-flow-${(i % 6) + 1}`}
              />
            </g>
          ))}

          {/* Nodes */}
          {nodes.map(n => {
            const isAI = n.sub === 'AI'
            const isHuman = n.sub === 'HUMAN'
            return (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <rect
                  x="-40" y="-20" width="80" height="40"
                  fill="rgba(245,244,242,0.9)"
                  className={isAI ? 'prc-node-ai' : isHuman ? 'prc-node-human' : 'prc-node-tool'}
                  strokeWidth="0.75"
                />
                <text className="prc-lbl" x="0" y="-4" textAnchor="middle">{n.label}</text>
                <text className="prc-sub" x="0" y="9" textAnchor="middle">{n.sub}</text>
              </g>
            )
          })}
        </g>

        {/* Status bar */}
        <rect x="20" y="320" width="560" height="40" fill="rgba(33,6,117,0.04)" stroke="rgba(33,6,117,0.1)" strokeWidth="0.5" />
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.5)', letterSpacing: '0.1em' }} x="32" y="344">PIPELINE:ACTIVE</text>
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(117,26,46,0.6)', letterSpacing: '0.1em' }} x="220" y="344">QUEUE: 3 TASKS PENDING</text>
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.4)', letterSpacing: '0.1em' }} x="450" y="344">UPTIME: 99.8%</text>
      </svg>
    </div>
  )
}

function FoundationVisual() {
  const col1 = [
    '01001101 01101111 01100100',
    '01100101 01101100 00100000',
    '01110100 01110010 01100001',
    '01101001 01101110 01101001',
    '01101110 01100111 00100000',
    '01100100 01100001 01110100',
    '01100001 00100000 01110011',
    '01100101 01110100 00100000',
    '01110110 01100001 01101100',
    '01101001 01100100 01100001',
    '01110100 01100101 01100100',
    '01001101 01101111 01100100',
    '01100101 01101100 00100000',
    '01110100 01110010 01100001',
  ]
  const col2 = [
    'token_embed → attention',
    'ffn → norm → logits',
    'sample → decode → stream',
    'context_window: 200k',
    'retrieval: dense+sparse',
    'rerank → synthesize',
    'temperature: 0.7 → 1.0',
    'top_p: 0.95 | top_k: 40',
    'max_tokens: 4096',
    'system → user → assistant',
    'tool_call → tool_result',
    'finish_reason: stop',
    'token_embed → attention',
    'ffn → norm → logits',
  ]
  const col3 = [
    '∑ w_i · x_i + b → σ(z)',
    '∇L(θ) → θ − α∇L(θ)',
    'KL(p || q) = 0.042',
    'BLEU: 0.74 | ROUGE: 0.81',
    'perplexity: 12.4',
    'eval_score: 4.2 / 5.0',
    'latency_p50: 320ms',
    'latency_p99: 1.2s',
    'cost_per_1k: $0.003',
    'provider: anthropic/claude',
    'fallback: openai/gpt-4o',
    '∑ w_i · x_i + b → σ(z)',
    '∇L(θ) → θ − α∇L(θ)',
    'KL(p || q) = 0.042',
  ]

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .fmi-col1 { animation: matrix-scroll 18s linear infinite; }
        .fmi-col2 { animation: matrix-scroll 24s linear infinite; animation-delay: -6s; }
        .fmi-col3 { animation: matrix-scroll 14s linear infinite; animation-delay: -3s; }
        .fmi-text { font-family: 'IBM Plex Mono', monospace; font-size: 10px; fill: rgba(33,6,117,0.6); letter-spacing: 0.06em; }
        .fmi-text-r { font-family: 'IBM Plex Mono', monospace; font-size: 10px; fill: rgba(117,26,46,0.5); letter-spacing: 0.06em; }
        .fmi-text-m { font-family: 'IBM Plex Mono', monospace; font-size: 10px; fill: rgba(33,6,117,0.35); letter-spacing: 0.06em; }
      `}</style>
      <svg viewBox="0 0 640 560" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f4f2" stopOpacity="1" />
            <stop offset="25%" stopColor="#f5f4f2" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="btmFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="75%" stopColor="#f5f4f2" stopOpacity="0" />
            <stop offset="100%" stopColor="#f5f4f2" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="matrixFade2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#210675" stopOpacity="0" />
            <stop offset="15%" stopColor="#210675" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#751A2E" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#751A2E" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Column dividers */}
        <line x1="213" y1="0" x2="213" y2="560" stroke="rgba(33,6,117,0.08)" strokeWidth="0.5" />
        <line x1="426" y1="0" x2="426" y2="560" stroke="rgba(33,6,117,0.08)" strokeWidth="0.5" />

        {/* Col 1 - binary */}
        <g className="fmi-col1" style={{ willChange: 'transform' }}>
          {[...col1, ...col1].map((t, i) => (
            <text key={i} className="fmi-text" x="16" y={24 + i * 28}>{t}</text>
          ))}
        </g>

        {/* Col 2 - token text */}
        <g className="fmi-col2" style={{ willChange: 'transform' }}>
          {[...col2, ...col2].map((t, i) => (
            <text key={i} className="fmi-text-r" x="228" y={36 + i * 28}>{t}</text>
          ))}
        </g>

        {/* Col 3 - math/metrics */}
        <g className="fmi-col3" style={{ willChange: 'transform' }}>
          {[...col3, ...col3].map((t, i) => (
            <text key={i} className="fmi-text-m" x="440" y={20 + i * 28}>{t}</text>
          ))}
        </g>

        {/* Fade masks */}
        <rect width="640" height="560" fill="url(#topFade)" />
        <rect width="640" height="560" fill="url(#btmFade)" />

        {/* Crosshair / active line */}
        <rect x="0" y="268" width="640" height="24" fill="rgba(33,6,117,0.04)" />
        <line x1="0" y1="268" x2="640" y2="268" stroke="rgba(33,6,117,0.15)" strokeWidth="0.5" />
        <line x1="0" y1="292" x2="640" y2="292" stroke="rgba(33,6,117,0.15)" strokeWidth="0.5" />
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.4)', letterSpacing: '0.1em' }} x="16" y="283">▶ EVALUATING PROMPT v2.14...</text>
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.3)', letterSpacing: '0.1em', animation: 'blink-cursor 1s step-end infinite' }} x="256" y="283">█</text>
      </svg>
    </div>
  )
}

const visualMap: Record<string, React.ReactNode> = {
  'signal-intelligence-platform': <SignalVisual />,
  'compass-design-os': <CompassVisual />,
  'process-architect': <ProcessVisual />,
  'foundation-model-interface': <FoundationVisual />,
}

// ─── Section Visuals (inline for each section) ────────────────────────────

function SectionVisual({ slug, sectionNum }: { slug: string; sectionNum: string }) {
  if (slug === 'signal-intelligence-platform') {
    if (sectionNum === '01') return (
      <div className="project-section-visual">
        <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
          {['REST', 'WEBSOCKET', 'BATCH'].map((src, i) => (
            <g key={src}>
              <rect x="20" y={40 + i * 80} width="100" height="32" fill="rgba(33,6,117,0.06)" stroke="rgba(33,6,117,0.25)" strokeWidth="0.75" />
              <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.7)', letterSpacing: '0.1em' }} x="70" y={60 + i * 80} textAnchor="middle">{src}</text>
              <line x1="120" y1={56 + i * 80} x2="220" y2="136" stroke="rgba(33,6,117,0.2)" strokeWidth="0.75" strokeDasharray="4 4" />
            </g>
          ))}
          <rect x="220" y="112" width="100" height="48" fill="rgba(33,6,117,0.08)" stroke="rgba(33,6,117,0.4)" strokeWidth="1" />
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: '#210675', letterSpacing: '0.1em' }} x="270" y="134" textAnchor="middle">KAFKA</text>
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8px', fill: 'rgba(33,6,117,0.5)', letterSpacing: '0.08em' }} x="270" y="148" textAnchor="middle">INGEST</text>
          <line x1="320" y1="136" x2="380" y2="136" stroke="rgba(33,6,117,0.3)" strokeWidth="1" />
          <rect x="380" y="112" width="80" height="48" fill="rgba(33,6,117,0.04)" stroke="rgba(33,6,117,0.2)" strokeWidth="0.75" />
          <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.6)', letterSpacing: '0.1em' }} x="420" y="140" textAnchor="middle">NORM</text>
        </svg>
      </div>
    )
  }
  if (slug === 'compass-design-os') {
    if (sectionNum === '01') return (
      <div className="project-section-visual">
        <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
          {[
            { y: 40, label: 'PRIMITIVES', vals: ['blue/500 = #3B82F6', 'gray/900 = #111827', 'spacing/4 = 16px'], color: 'rgba(33,6,117,0.1)' },
            { y: 120, label: 'SEMANTIC', vals: ['color/bg/primary → alias', 'color/text/default → alias', 'spacing/md → alias'], color: 'rgba(33,6,117,0.06)' },
            { y: 200, label: 'COMPONENT', vals: ['button/bg → semantic', 'button/text → semantic'], color: 'rgba(33,6,117,0.04)' },
          ].map(row => (
            <g key={row.label}>
              <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '8px', fill: 'rgba(33,6,117,0.5)', letterSpacing: '0.15em' }} x="20" y={row.y}>{row.label}</text>
              <rect x="20" y={row.y + 6} width="440" height="56" fill={row.color} stroke="rgba(33,6,117,0.18)" strokeWidth="0.5" />
              {row.vals.map((v, vi) => (
                <text key={vi} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', fill: 'rgba(33,6,117,0.7)', letterSpacing: '0.06em' }} x="32" y={row.y + 26 + vi * 14}>{v}</text>
              ))}
            </g>
          ))}
          {/* Arrows between layers */}
          <line x1="240" y1="98" x2="240" y2="120" stroke="rgba(33,6,117,0.3)" strokeWidth="0.75" markerEnd="url(#arr)" />
          <line x1="240" y1="178" x2="240" y2="200" stroke="rgba(33,6,117,0.3)" strokeWidth="0.75" />
        </svg>
      </div>
    )
  }
  // Generic fallback visual
  return (
    <div className="project-section-visual">
      <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
        <defs>
          <pattern id={`dg-${slug}-${sectionNum}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.7" fill="rgba(33,6,117,0.3)" />
          </pattern>
        </defs>
        <rect width="480" height="280" fill={`url(#dg-${slug}-${sectionNum})`} />
        <rect x="40" y="40" width="400" height="200" stroke="rgba(33,6,117,0.2)" strokeWidth="0.5" fill="none" />
        <rect x="80" y="80" width="320" height="120" stroke="rgba(33,6,117,0.12)" strokeWidth="0.5" fill="none" />
        <text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', fill: 'rgba(33,6,117,0.4)', letterSpacing: '0.15em' }} x="240" y="148" textAnchor="middle">{sectionNum}</text>
      </svg>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = projects[slug]
  if (!p) return {}
  return {
    title: `${p.titleLines.join(' ')} — STUDIO CT`,
    description: p.overviewBody,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = projects[slug]
  if (!p) notFound()

  const heroVisual = visualMap[slug]
  const nextProject = projects[p.nextSlug]

  return (
    <>
      <RevealManager />

      {/* Nav */}
      <nav className="project-nav">
        <Link href="/#work" className="project-nav-back">
          ← Work
        </Link>
        <div className="project-nav-id">
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.15em' }}>◈</span>
          {' '}
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--subtle)' }}>STUDIO — CT</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="project-hero">
        <div className="project-hero-content">
          <p className="project-breadcrumb">{p.num} / Selected Work</p>
          <p className="project-cat">{p.tag}</p>
          <h1 className="project-headline">
            {p.titleLines.map((line, i) => (
              i === p.outlineIndex
                ? <span key={i} className="line-outline">{line}</span>
                : <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h1>
          <div className="project-meta-row">
            <div className="project-meta-item">
              <p className="project-meta-label">Year</p>
              <p className="project-meta-value">{p.year}</p>
            </div>
            <div className="project-meta-item">
              <p className="project-meta-label">Role</p>
              <p className="project-meta-value">{p.role}</p>
            </div>
            <div className="project-meta-item">
              <p className="project-meta-label">Status</p>
              <p className="project-meta-value">{p.status}</p>
            </div>
          </div>
        </div>

        <div className="project-hero-visual">
          {heroVisual}
        </div>
      </section>

      {/* Deliverables strip */}
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '18px 48px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--subtle)', textTransform: 'uppercase' }}>Deliverables</span>
        <span style={{ width: '24px', height: '1px', background: 'var(--border)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)' }}>{p.deliverables}</span>
      </div>

      {/* Overview */}
      <section className="project-overview">
        <div className="reveal">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-num">00</span>
            <span className="section-title">Overview</span>
            <div className="section-line" />
          </div>
          <p className="project-overview-statement">{p.challengeStatement}</p>
        </div>
        <div className="project-overview-body reveal reveal-delay-1">
          <p className="project-overview-text">{p.overviewBody}</p>
          <ul className="project-spec-list">
            {p.specs.map(s => (
              <li key={s.label}>
                <span>{s.label}</span>
                <span>{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Content sections */}
      {p.sections.map((sec, i) => (
        <section key={sec.num} className={`project-section${i % 2 === 1 ? ' reversed' : ''}`}>
          <div className="reveal">
            <div className="section-header" style={{ marginBottom: '32px' }}>
              <span className="section-num">{sec.num}</span>
              <span className="section-title">{sec.title}</span>
              <div className="section-line" />
            </div>
            <h2 className="project-section-heading">{sec.title}</h2>
            <p className="project-section-body">{sec.body}</p>
          </div>
          <div className="reveal reveal-delay-1">
            <SectionVisual slug={slug} sectionNum={sec.num} />
          </div>
        </section>
      ))}

      {/* Outcomes */}
      <section className="project-outcomes">
        <div className="section-header reveal">
          <span className="section-num">04</span>
          <span className="section-title">Impact</span>
          <div className="section-line" />
        </div>
        <div className="project-outcome-grid">
          {p.outcomes.map((o, i) => (
            <div key={i} className={`project-outcome-cell reveal reveal-delay-${i}`}>
              <p className="project-outcome-value">{o.value}</p>
              <p className="project-outcome-label">{o.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next project */}
      <div className="next-project reveal">
        <Link href={`/work/${p.nextSlug}`} className="next-project-link">
          <div>
            <p className="next-project-eyebrow">Next Project</p>
            <p className="next-project-title">{p.nextTitle}</p>
          </div>
          <div className="next-project-arrow">↗</div>
        </Link>
      </div>

      <Footer />
    </>
  )
}
