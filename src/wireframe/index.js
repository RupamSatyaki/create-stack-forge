import { buildTree } from './tree.js'
import chalk from 'chalk'

// Called during folder selection (live update) and final preview
export function renderTree({ projectName, part, folders, frontendFolders, backendFolders }) {
  let tree = ''

  if (part === 'frontend') {
    tree = buildTree({
      projectName,
      frontendFolders: folders,
      includeFrontend: true,
      includeBackend: false,
    })
  } else if (part === 'backend') {
    tree = buildTree({
      projectName,
      backendFolders: folders,
      includeFrontend: false,
      includeBackend: true,
    })
  } else {
    // both — final preview
    tree = buildTree({
      projectName,
      frontendFolders,
      backendFolders,
      includeFrontend: !!frontendFolders,
      includeBackend: !!backendFolders,
    })
  }

  return chalk.dim('\n' + tree + '\n')
}
