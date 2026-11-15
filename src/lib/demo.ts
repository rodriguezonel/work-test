export type DemoOptions = {
  slow: boolean
  forceError: boolean
}

const DEFAULTS: DemoOptions = { slow: false, forceError: false }
const STORAGE_KEY = 'demo-options'

/**
 * En Vitest `MODE === 'test'`, así que la demo queda inerte (sin demora, sin
 * errores y sin tocar localStorage) y no afecta la suite.
 */
export const DEMO_ACTIVE = import.meta.env.MODE !== 'test'

export const DEMO_DELAY_MS = 1200

function parseOptions(raw: string | null): DemoOptions {
  if (!raw) return { ...DEFAULTS }

  try {
    const parsed = JSON.parse(raw) as Partial<Record<keyof DemoOptions, unknown>>
    return {
      slow: typeof parsed.slow === 'boolean' ? parsed.slow : DEFAULTS.slow,
      forceError:
        typeof parsed.forceError === 'boolean'
          ? parsed.forceError
          : DEFAULTS.forceError,
    }
  } catch {
    return { ...DEFAULTS }
  }
}

export function loadDemoOptions(): DemoOptions {
  if (!DEMO_ACTIVE) return { ...DEFAULTS }

  try {
    return parseOptions(localStorage.getItem(STORAGE_KEY))
  } catch {
    return { ...DEFAULTS }
  }
}

let options: DemoOptions = loadDemoOptions()

export function getDemoOptions(): DemoOptions {
  return options
}

export function setDemoOptions(next: Partial<DemoOptions>): DemoOptions {
  options = { ...options, ...next }

  if (DEMO_ACTIVE) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(options))
    } catch {
      // localStorage puede fallar (modo privado, cuota); la demo sigue funcionando.
    }
  }

  return options
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
