export type DemoOptions = {
  slow: boolean
  forceError: boolean
}

const DEFAULTS: DemoOptions = { slow: false, forceError: false }

/**
 * En Vitest `MODE === 'test'`, así que la demo queda inerte y no afecta la suite.
 */
export const DEMO_ACTIVE = import.meta.env.MODE !== 'test'

export const DEMO_DELAY_MS = 1200

let options: DemoOptions = { ...DEFAULTS }

export function setDemoOptions(next: Partial<DemoOptions>) {
  options = { ...options, ...next }
}

export function getDemoOptions(): DemoOptions {
  return options
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
