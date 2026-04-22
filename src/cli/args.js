import { DEFAULT_PRESET } from '../constants/defaults.js'

export function resolveArgs(projectName, options) {
  // Start with default preset if --default flag
  const base = options.default
    ? { projectName, ...DEFAULT_PRESET, skipPrompts: true }
    : { projectName, skipPrompts: false }

  // --only overrides default preset's include flags
  if (options.only === 'frontend') {
    base.includeFrontend = true
    base.includeBackend  = false
    base.backend         = null
    base.skipPrompts     = true
  } else if (options.only === 'backend') {
    base.includeFrontend = false
    base.includeBackend  = true
    base.frontend        = null
    base.skipPrompts     = true
  }

  // Individual flags
  if (options.frontend) base.frontendFramework = options.frontend
  if (options.backend)  base.backendFramework  = options.backend
  if (options.db)       base.database          = options.db
  if (options.css)      base.styling           = options.css

  return base
}
