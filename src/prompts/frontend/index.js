import * as p from '@clack/prompts'
import { promptFrontendFramework } from './framework.js'
import { promptFrontendVersion } from './version.js'
import { promptStyling } from './styling.js'
import { promptFrontendFolders } from './folders.js'

export async function promptFrontend(config, projectName) {
  p.intro('── FRONTEND ──────────────────────────────────')

  const framework = await promptFrontendFramework(config.frontendFramework)
  if (!framework) return null

  const version = await promptFrontendVersion(framework)
  if (!version) return null

  const styling = await promptStyling(config.styling)
  if (!styling) return null

  const folders = await promptFrontendFolders(projectName)
  if (!folders) return null

  return { framework, version, styling, folders }
}
