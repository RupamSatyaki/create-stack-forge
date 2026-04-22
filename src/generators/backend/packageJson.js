import { DATABASES } from '../../constants/databases.js'
import { BACKEND_VERSIONS } from '../../constants/versions.js'

export function generateBackendPackageJson(projectName, framework, database, version = '4') {
  const dbEntry = DATABASES.find(d => d.value === database)
  const dbPkgs  = dbEntry?.pkg?.split(' ').filter(Boolean) || []

  // Get exact pkg string for chosen version
  const versionList = BACKEND_VERSIONS[framework] || []
  const versionEntry = versionList.find(v => v.value === version) || versionList[0]
  const frameworkPkg = versionEntry?.pkg || ''

  const deps = {
    dotenv: '^16.0.0',
    cors:   '^2.8.5',
  }

  // Framework deps from version entry
  if (framework.startsWith('express')) {
    const ver = version === '5' ? '^5.0.0' : '^4.18.0'
    deps.express = ver
    deps.jsonwebtoken = '^9.0.0'
    deps.bcryptjs = '^2.4.3'
  }
  if (framework.startsWith('fastify')) {
    const ver = version === '5' ? '^5.0.0' : '^4.0.0'
    deps.fastify = ver
    deps['@fastify/cors'] = '^9.0.0'
  }

  dbPkgs.forEach(pkg => { deps[pkg] = 'latest' })

  const devDeps = { nodemon: '^3.0.0' }
  if (framework.endsWith('-ts')) {
    devDeps.typescript = '^5.0.0'
    devDeps['ts-node'] = '^10.0.0'
    devDeps['@types/node'] = '^20.0.0'
    if (framework.startsWith('express')) devDeps['@types/express'] = '^4.0.0'
  }

  const isTs = framework.endsWith('-ts')
  const entry = isTs ? 'src/index.ts' : 'src/index.js'

  return JSON.stringify({
    name: `${projectName}-backend`,
    version: '1.0.0',
    type: 'module',
    main: entry,
    scripts: {
      start: `node ${entry}`,
      dev:   isTs ? `ts-node ${entry}` : `nodemon ${entry}`,
      seed:  `node db/seed.js`,
    },
    dependencies: deps,
    devDependencies: devDeps,
  }, null, 2)
}
