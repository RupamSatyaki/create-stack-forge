export function generateFastifyIndex(folders, database) {
  const has = (f) => folders.includes(f)

  const imports = [`import Fastify from 'fastify'`, `import dotenv from 'dotenv'`]
  const setup   = [`dotenv.config()`, `const app = Fastify({ logger: true })`, `const PORT = process.env.PORT || 3000`]
  const boot    = []

  if (has('config') && database !== 'none') {
    imports.push(`import { connectDB } from './config/db.js'`)
  }
  if (has('routes')) {
    imports.push(`import routes from './routes/index.js'`)
    setup.push(`app.register(routes, { prefix: '/api' })`)
  }

  if (has('config') && database !== 'none') {
    boot.push(`await connectDB()`)
  }
  boot.push(`await app.listen({ port: PORT })`)

  return [...imports, '', ...setup, '', `const start = async () => {`, `  try {`, ...boot.map(l => `    ${l}`), `  } catch (err) {`, `    app.log.error(err)`, `    process.exit(1)`, `  }`, `}`, ``, `start()`, ''].join('\n')
}
