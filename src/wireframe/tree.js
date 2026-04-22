// Builds a tree string from selected folders
export function buildTree({ projectName, frontendFolders = [], backendFolders = [], includeFrontend = true, includeBackend = true }) {
  const lines = []
  lines.push(`📁 ${projectName}/`)

  if (includeFrontend && frontendFolders !== false) {
    lines.push('├── 📁 frontend/')
    const feFolders = frontendFolders || []
    feFolders.forEach((f, i) => {
      const isLast = i === feFolders.length - 1 && !includeBackend
      lines.push(`│   ├── 📁 ${f}/`)
    })
    lines.push('│   └── 📄 package.json')
  }

  if (includeBackend && backendFolders !== false) {
    lines.push('└── 📁 backend/')
    const beFolders = backendFolders || []
    beFolders.forEach((f) => {
      lines.push(`    ├── 📁 ${f}/`)
    })
    lines.push('    └── 📄 package.json')
  }

  return lines.join('\n')
}
