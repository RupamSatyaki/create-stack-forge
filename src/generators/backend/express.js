// Generates src/index.js content based on selected folders
export function generateExpressIndex(folders, database) {
  const has = (f) => folders.includes(f)

  const imports = [`import express from 'express'`, `import dotenv from 'dotenv'`, `import cors from 'cors'`]
  const setup   = [`dotenv.config()`, `const app = express()`, `const PORT = process.env.PORT || 3000`, ``, `app.use(cors())`, `app.use(express.json())`]
  const boot    = []

  // Conditional imports based on selected folders
  if (has('config') && database !== 'none') {
    imports.push(`import { connectDB } from './config/db.js'`)
  }
  if (has('routes')) {
    imports.push(`import routes from './routes/index.js'`)
    setup.push(`app.use('/api', routes)`)
  }
  if (has('middlewares')) {
    imports.push(`import { errorHandler } from './middlewares/error.middleware.js'`)
    // error handler goes last
  }

  // Boot sequence
  if (has('config') && database !== 'none') {
    boot.push(`connectDB().then(() => {`)
    boot.push(`  app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`))`)
    boot.push(`})`)
  } else {
    boot.push(`app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`))`)
  }

  // Error handler must be last middleware
  if (has('middlewares')) {
    setup.push(`app.use(errorHandler)`)
  }

  return [...imports, '', ...setup, '', ...boot, ''].join('\n')
}
