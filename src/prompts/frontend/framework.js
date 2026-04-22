import * as p from '@clack/prompts'
import { FRONTEND_FRAMEWORKS } from '../../constants/frameworks.js'

export async function promptFrontendFramework(existing) {
  if (existing) return existing

  const framework = await p.select({
    message: 'Frontend framework:',
    options: FRONTEND_FRAMEWORKS,
  })

  if (p.isCancel(framework)) return null
  return framework
}
