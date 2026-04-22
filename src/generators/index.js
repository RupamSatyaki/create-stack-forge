import { generateBackend } from './backend/structure.js'
import { generateFrontend } from './frontend/structure.js'
import { generateExtras } from './extras/index.js'
import { writeFile, isDryRun } from '../utils/fileWriter.js'
import { resolvePath } from '../utils/pathResolver.js'
import { createSpinner } from '../utils/spinner.js'
import { writeForgeConfig } from '../utils/projectReader.js'

export async function generate(config) {
  const { projectName, includeFrontend, includeBackend, frontend, backend, extras } = config

  const spinner = createSpinner('Generating project...')
  spinner.start()

  try {
    // README
    await writeFile(resolvePath(projectName, 'README.md'), generateReadme(config))

    // Backend
    if (includeBackend && backend) {
      spinner.text = 'Generating backend...'
      await generateBackend(projectName, backend)
    }

    // Frontend
    if (includeFrontend && frontend) {
      spinner.text = 'Generating frontend...'
      await generateFrontend(projectName, frontend)
    }

    // Extras
    if (extras) {
      spinner.text = 'Adding extras...'
      await generateExtras(projectName, config)
    }

    spinner.succeed('Project generated successfully!')

    // Save .forgerc.json for future updates
    if (!isDryRun()) {
      await writeForgeConfig(resolvePath(projectName), {
        projectName,
        includeFrontend,
        includeBackend,
        frontend: frontend || null,
        backend:  backend  || null,
        extras:   extras   || null,
        createdAt: new Date().toISOString(),
      })
    }
  } catch (err) {
    spinner.fail('Generation failed')
    throw err
  }
}

function generateReadme(config) {
  const { projectName, includeFrontend, includeBackend } = config
  let content = `# ${projectName}\n\n`

  if (includeBackend) {
    content += `## Backend\n\n`
    content += `\`\`\`bash\ncd backend\nnpm install\nnpm run dev\n\`\`\`\n\n`
  }

  if (includeFrontend) {
    content += `## Frontend\n\n`
    content += `\`\`\`bash\ncd frontend\nnpm install\nnpm run dev\n\`\`\`\n\n`
  }

  content += `## Environment Variables\n\n`
  content += `Copy \`.env.example\` to \`.env\` and fill in your values.\n`

  return content
}
