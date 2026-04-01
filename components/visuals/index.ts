export { default as SignalVisual } from './SignalVisual'
export { default as CompassVisual } from './CompassVisual'
export { default as ProcessVisual } from './ProcessVisual'
export { default as FoundationVisual } from './FoundationVisual'

import SignalVisual from './SignalVisual'
import CompassVisual from './CompassVisual'
import ProcessVisual from './ProcessVisual'
import FoundationVisual from './FoundationVisual'

export const slugVisualMap: Record<string, React.ComponentType<{ theme?: 'light' | 'dark' }>> = {
  'signal-intelligence-platform': SignalVisual,
  'compass-design-os': CompassVisual,
  'process-architect': ProcessVisual,
  'foundation-model-interface': FoundationVisual,
}
