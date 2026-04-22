import { exec } from 'child_process'
import { promisify } from 'util'
import { resolvePath } from '../../utils/pathResolver.js'
import { isDryRun } from '../../utils/fileWriter.js'
import { logger } from '../../utils/logger.js'

const execAsync = promisify(exec)

export async function initGit(projectName) {
  if (isDryRun()) {
    logger.dryRun(`Would run: git init ${projectName}`)
    return
  }
  const cwd = resolvePath(projectName)
  try {
    await execAsync('git init', { cwd })
    logger.created(`${projectName}/.git`)
  } catch {
    logger.warn('git init failed — is git installed?')
  }
}
