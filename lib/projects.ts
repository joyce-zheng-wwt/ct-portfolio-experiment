export type TextSegment = { text: string; em?: boolean }
export type Outcome = { value: string; label: string }
export type Section = { num: string; title: string; body: string }

export type ProjectData = {
  num: string
  tag: string
  titleLines: string[]
  outlineIndex: number
  year: string
  role: string
  deliverables: string
  status: string
  challengeSegments: TextSegment[]
  overviewBody: string
  specs: Array<{ label: string; value: string }>
  sections: Section[]
  outcomes: Outcome[]
  nextSlug: string
  nextTitle: string
}

export const projects: Record<string, ProjectData> = {
  'signal-intelligence-platform': {
    num: '01',
    tag: 'AI Infrastructure',
    titleLines: ['Signal', 'Intelligence', 'Platform'],
    outlineIndex: 1,
    year: '2024',
    role: 'Creative Technology Lead',
    deliverables: 'Architecture · UI System · Data Viz',
    status: 'Deployed — Production',
    challengeSegments: [
      { text: 'A financial client had 14 disparate signal streams with ' },
      { text: 'no unified classification layer', em: true },
      { text: ' — analysts were drowning in noise.' },
    ],
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
    challengeSegments: [
      { text: 'Six product teams diverging in visual language and component patterns — creating ' },
      { text: '3× rework cost', em: true },
      { text: ' every time a design decision changed centrally.' },
    ],
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
    challengeSegments: [
      { text: 'A media studio had ' },
      { text: '14 manual handoff steps', em: true },
      { text: ' between creative brief and final delivery — with zero visibility into where work actually stalled.' },
    ],
    overviewBody:
      "Process Architect is a visual workflow engine for creative production pipelines — where each step can be executed by a human, an LLM, or an external tool, with full audit trail and real-time operator control. It reduced the studio's 14-step process to 3 automated stages.",
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
    challengeSegments: [
      { text: 'Teams managing prompts in spreadsheets and running ' },
      { text: 'ad-hoc evaluations per provider', em: true },
      { text: ' — impossible to improve quality or migrate models systematically.' },
    ],
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

export const slugs = Object.keys(projects)
