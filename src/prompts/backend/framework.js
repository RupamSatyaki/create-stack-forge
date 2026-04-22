import * as p from '@clack/prompts'
import { BACKEND_FRAMEWORKS } from '../../constants/frameworks.js'

export async function promptBackendFramework(existing) {
  if (existing) return existing

  const framework = await p.select({
    message: 'Backend framework:',
    options: BACKEND_FRAMEWORKS,
  })

  if (p.isCancel(framework)) return null
  return framework
}
