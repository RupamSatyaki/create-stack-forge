import * as p from '@clack/prompts'
import { promptProjectName } from './project.js'
import { promptParts } from './parts.js'
import { promptFrontend } from './frontend/index.js'
import { promptBackend } from './backend/index.js'
import { promptExtras } from './extras.js'
import { renderTree } from '../wireframe/index.js'
import chalk from 'chalk'

export async function runPrompts(argsConfig) {
  p.intro(chalk.cyan('create-stack-forge — Let\'s build your stack!'))

  // Step 1 — project name
  const projectName = await promptProjectName(argsConfig.projectName)
  if (!projectName) return null

  // Step 2 — frontend / backend
  const parts = await promptParts(argsConfig)
  if (!parts) return null

  const config = { projectName, ...parts }

  // Step 3 — frontend prompts
  if (parts.includeFrontend) {
    const frontend = await promptFrontend(argsConfig, projectName)
    if (!frontend) return null
    config.frontend = frontend
  }

  // Step 4 — backend prompts
  if (parts.includeBackend) {
    const backend = await promptBackend(argsConfig, projectName)
    if (!backend) return null
    config.backend = backend
  }

  // Step 5 — extras
  const extras = await promptExtras()
  if (!extras) return null
  config.extras = extras

  // Step 6 — show final wireframe preview
  console.log(chalk.cyan('\n── PREVIEW ───────────────────────────────────'))
  console.log(renderTree({
    projectName,
    part: 'both',
    frontendFolders: config.frontend?.folders,
    backendFolders:  config.backend?.folders,
  }))

  // Step 7 — confirm
  const confirm = await p.confirm({ message: 'Confirm and generate?' })
  if (p.isCancel(confirm) || !confirm) return null

  return config
}
