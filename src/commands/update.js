import * as p from '@clack/prompts'
import chalk from 'chalk'
import path from 'path'
import { readForgeConfig, detectProject, writeForgeConfig } from '../utils/projectReader.js'
import { writeFile } from '../utils/fileWriter.js'
import { setDryRun } from '../utils/fileWriter.js'
import { logger } from '../utils/logger.js'
import { getDbFiles } from '../generators/database/index.js'
import { getStylingFiles } from '../generators/styling/index.js'
import { generateBackendPackageJson } from '../generators/backend/packageJson.js'
import { generateFrontendPackageJson } from '../generators/frontend/packageJson.js'
import { resolvePath } from '../utils/pathResolver.js'

export async function runUpdate(projectPath, options = {}) {
  if (options.dryRun) {
    setDryRun(true)
    logger.warn('Dry-run mode — no files will be written\n')
  }

  const absPath = path.resolve(projectPath)

  // Try reading existing .forgerc.json
  let config = await readForgeConfig(absPath)

  if (!config) {
    // Auto-detect project structure
    const detected = await detectProject(absPath)
    logger.warn('No .forgerc.json found — detecting project structure...')

    if (!detected.hasFrontend && !detected.hasBackend) {
      logger.error('No frontend/ or backend/ found. Is this a create-stack-forge project?')
      process.exit(1)
    }

    logger.info(`Detected: ${[detected.hasFrontend && 'frontend', detected.hasBackend && 'backend'].filter(Boolean).join(' + ')}`)
    config = { projectPath: absPath, ...detected }
  }

  // Ask what to update
  p.intro(chalk.cyan('create-stack-forge update'))

  const toUpdate = await p.multiselect({
    message: 'What do you want to update?',
    options: [
      { value: 'packageJson',  label: 'package.json (dependencies)' },
      { value: 'dbConfig',     label: 'Database config files' },
      { value: 'stylingConfig',label: 'Styling config files' },
      { value: 'gitignore',    label: '.gitignore' },
      { value: 'env',          label: '.env.example' },
    ],
    required: true,
  })

  if (p.isCancel(toUpdate)) {
    logger.error('Cancelled.')
    process.exit(0)
  }

  const projectName = path.basename(absPath)

  // Update package.json
  if (toUpdate.includes('packageJson')) {
    if (config.hasBackend && config.backend) {
      const { framework, database, version } = config.backend
      const content = generateBackendPackageJson(projectName, framework, database, version)
      await writeFile(path.join(absPath, 'backend/package.json'), content)
    }
    if (config.hasFrontend && config.frontend) {
      const { framework, styling, version } = config.frontend
      const content = generateFrontendPackageJson(projectName, framework, styling, version)
      await writeFile(path.join(absPath, 'frontend/package.json'), content)
    }
  }

  // Update DB config
  if (toUpdate.includes('dbConfig') && config.backend?.database) {
    const dbFiles = getDbFiles(config.backend.database)
    for (const [relPath, content] of Object.entries(dbFiles)) {
      if (relPath === '.env') continue
      await writeFile(path.join(absPath, 'backend/src', relPath), content)
    }
  }

  // Update styling config
  if (toUpdate.includes('stylingConfig') && config.frontend?.styling) {
    const stylingFiles = getStylingFiles(config.frontend.styling)
    for (const [relPath, content] of Object.entries(stylingFiles)) {
      await writeFile(path.join(absPath, 'frontend', relPath), content)
    }
  }

  // Update .gitignore
  if (toUpdate.includes('gitignore')) {
    const gitignore = `node_modules\ndist\n.env\n*.log\n`
    if (config.hasBackend)  await writeFile(path.join(absPath, 'backend/.gitignore'), gitignore)
    if (config.hasFrontend) await writeFile(path.join(absPath, 'frontend/.gitignore'), gitignore)
  }

  // Update .env.example
  if (toUpdate.includes('env') && config.backend?.database) {
    const dbFiles = getDbFiles(config.backend.database)
    const envContent = dbFiles['.env'] || `PORT=3000\nJWT_SECRET=\n`
    await writeFile(path.join(absPath, 'backend/.env.example'), envContent.replace(/=.+/g, '='))
  }

  // Save updated .forgerc.json
  if (!options.dryRun) {
    await writeForgeConfig(absPath, { ...config, updatedAt: new Date().toISOString() })
  }

  logger.success('\nUpdate complete!')
}
