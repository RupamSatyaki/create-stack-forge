import fs from 'fs-extra'
import path from 'path'
import { logger } from './logger.js'

// Global dry-run flag
let _dryRun = false
export const setDryRun = (val) => { _dryRun = val }
export const isDryRun  = () => _dryRun

export async function writeFile(filePath, content) {
  const rel = path.relative(process.cwd(), filePath)
  if (_dryRun) {
    logger.dryRun(`Would create  ${rel}`)
    return
  }
  await fs.ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, content, 'utf8')
  logger.created(rel)
}

export async function ensureDir(dirPath) {
  const rel = path.relative(process.cwd(), dirPath)
  if (_dryRun) {
    logger.dryRun(`Would mkdir   ${rel}`)
    return
  }
  await fs.ensureDir(dirPath)
  const gitkeep = path.join(dirPath, '.gitkeep')
  if (!(await fs.pathExists(gitkeep))) {
    await fs.writeFile(gitkeep, '')
  }
}

export function skipFile(filePath) {
  const rel = path.relative(process.cwd(), filePath)
  logger.skipped(rel)
}
