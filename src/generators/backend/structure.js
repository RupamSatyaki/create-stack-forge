import { writeFile, ensureDir } from '../../utils/fileWriter.js'
import { backendPath } from '../../utils/pathResolver.js'
import { generateExpressIndex } from './express.js'
import { generateFastifyIndex } from './fastify.js'
import { generateRoutesIndex, generateUserRoutes, generateUserController, generateUserService, UTILS_TEMPLATES, MIDDLEWARE_TEMPLATES } from './templates.js'
import { generateBackendPackageJson } from './packageJson.js'
import { getDbFiles } from '../database/index.js'

export async function generateBackend(projectName, config) {
  const { framework, database, folders } = config
  const has = (f) => folders.includes(f)
  const base = (p) => backendPath(projectName, p)

  // src/index.js
  const indexContent = framework.startsWith('express')
    ? generateExpressIndex(folders, database)
    : generateFastifyIndex(folders, database)
  await writeFile(base('src/index.js'), indexContent)

  // routes
  if (has('routes')) {
    await writeFile(base('src/routes/index.js'), generateRoutesIndex(folders))
    await writeFile(base('src/routes/user.routes.js'), generateUserRoutes(folders))
  }

  // controllers
  if (has('controllers')) {
    await writeFile(base('src/controllers/user.controller.js'), generateUserController(folders))
  }

  // services
  if (has('services')) {
    await writeFile(base('src/services/user.service.js'), generateUserService(folders))
  }

  // utils
  if (has('utils')) {
    for (const [file, content] of Object.entries(UTILS_TEMPLATES)) {
      await writeFile(base(`src/utils/${file}`), content)
    }
  }

  // middlewares
  if (has('middlewares')) {
    for (const [file, content] of Object.entries(MIDDLEWARE_TEMPLATES)) {
      await writeFile(base(`src/middlewares/${file}`), content)
    }
  }

  // database files
  const dbFiles = getDbFiles(database)
  for (const [relPath, content] of Object.entries(dbFiles)) {
    if (relPath === '.env') continue // handled separately
    // db/seed.js goes directly under backend/
    if (relPath.startsWith('db/')) {
      await writeFile(base(relPath), content)
    } else {
      await writeFile(base(`src/${relPath}`), content)
    }
  }

  // models (if no db model was written but models folder selected)
  if (has('models') && !dbFiles['models/user.model.js']) {
    await ensureDir(base('src/models'))
  }

  // config env.js
  if (has('config')) {
    await writeFile(base('src/config/env.js'), `export const PORT = process.env.PORT || 3000\nexport const JWT_SECRET = process.env.JWT_SECRET || 'secret'\n`)
  }

  // package.json
  await writeFile(base('package.json'), generateBackendPackageJson(projectName, framework, database, config.version || '4'))

  // .gitignore
  await writeFile(base('.gitignore'), `node_modules\n.env\ndist\n`)

  // .env
  const envContent = dbFiles['.env'] || `PORT=3000\nJWT_SECRET=your_jwt_secret_here\n`
  await writeFile(base('.env'), envContent)
  await writeFile(base('.env.example'), envContent.replace(/=.+/g, '='))
}
