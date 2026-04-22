import { showBanner } from './banner.js'
import { resolveArgs } from './args.js'
import { runPrompts } from '../prompts/index.js'
import { generate } from '../generators/index.js'
import { logger } from '../utils/logger.js'
import { setDryRun } from '../utils/fileWriter.js'

export async function run(projectName, options) {
  showBanner()

  // Set dry-run mode globally
  if (options.dryRun) {
    setDryRun(true)
    logger.warn('Dry-run mode — no files will be created\n')
  }

  const argsConfig = resolveArgs(projectName, options)

  let finalConfig
  if (argsConfig.skipPrompts) {
    finalConfig = argsConfig
  } else {
    finalConfig = await runPrompts(argsConfig)
  }

  if (!finalConfig) {
    logger.error('Setup cancelled.')
    process.exit(0)
  }

  await generate(finalConfig)

  if (options.dryRun) {
    logger.warn('\nDry-run complete. No files were written.')
    return
  }

  logger.success(`\n✔ Project "${finalConfig.projectName}" created!\n`)
  logger.info('Next steps:')

  if (finalConfig.includeBackend) {
    logger.info(`  cd ${finalConfig.projectName}/backend && npm install`)
  }
  if (finalConfig.includeFrontend) {
    logger.info(`  cd ${finalConfig.projectName}/frontend && npm install`)
  }

  console.log()
}
