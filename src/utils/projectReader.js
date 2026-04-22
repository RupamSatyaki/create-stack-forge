import fs from 'fs-extra'
import path from 'path'

// Reads .forgerc.json from an existing project
export async function readForgeConfig(projectPath) {
  const configPath = path.join(projectPath, '.forgerc.json')
  if (!(await fs.pathExists(configPath))) return null
  return fs.readJson(configPath)
}

// Writes .forgerc.json to project root
export async function writeForgeConfig(projectPath, config) {
  const configPath = path.join(projectPath, '.forgerc.json')
  await fs.writeJson(configPath, config, { spaces: 2 })
}

// Detects existing project structure
export async function detectProject(projectPath) {
  const hasFrontend = await fs.pathExists(path.join(projectPath, 'frontend'))
  const hasBackend  = await fs.pathExists(path.join(projectPath, 'backend'))
  const fePkg = hasFrontend ? await fs.readJson(path.join(projectPath, 'frontend/package.json')).catch(() => null) : null
  const bePkg = hasBackend  ? await fs.readJson(path.join(projectPath, 'backend/package.json')).catch(() => null)  : null

  return {
    hasFrontend,
    hasBackend,
    frontendName: fePkg?.name,
    backendName:  bePkg?.name,
    frontendDeps: fePkg?.dependencies || {},
    backendDeps:  bePkg?.dependencies || {},
  }
}
