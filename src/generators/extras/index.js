import { initGit } from './gitInit.js'
import { generateEslint } from './eslint.js'
import { generatePrettier } from './prettier.js'
import { generateDocker } from './docker.js'

export async function generateExtras(projectName, config) {
  const { extras } = config

  if (extras.gitInit) {
    await initGit(projectName)
  }

  if (extras.eslint) {
    await generateEslint(projectName)
  }

  if (extras.prettier) {
    await generatePrettier(projectName)
  }

  if (extras.docker) {
    await generateDocker(projectName, config)
  }
}
