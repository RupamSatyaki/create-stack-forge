import * as p from '@clack/prompts'
import { promptBackendFramework } from './framework.js'
import { promptBackendVersion } from './version.js'
import { promptDatabase } from './database.js'
import { promptBackendFolders } from './folders.js'

export async function promptBackend(config, projectName) {
  p.intro('── BACKEND ───────────────────────────────────')

  const framework = await promptBackendFramework(config.backendFramework)
  if (!framework) return null

  const version = await promptBackendVersion(framework)
  if (!version) return null

  const database = await promptDatabase(config.database)
  if (!database) return null

  const folders = await promptBackendFolders(projectName)
  if (!folders) return null

  return { framework, version, database, folders }
}
