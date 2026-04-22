import path from 'path'

export function resolvePath(...parts) {
  return path.join(process.cwd(), ...parts)
}

export function frontendPath(projectName, ...parts) {
  return resolvePath(projectName, 'frontend', ...parts)
}

export function backendPath(projectName, ...parts) {
  return resolvePath(projectName, 'backend', ...parts)
}
