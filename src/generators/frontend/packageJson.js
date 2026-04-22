import { STYLING_OPTIONS } from '../../constants/styling.js'
import { FRONTEND_VERSIONS } from '../../constants/versions.js'

export function generateFrontendPackageJson(projectName, framework, styling, version = '18') {
  const styleEntry = STYLING_OPTIONS.find(s => s.value === styling)
  const stylePkgs  = styleEntry?.pkg?.split(' ').filter(Boolean) || []

  const isTs    = framework.endsWith('-ts')
  const isReact = framework.startsWith('react')
  const isVue   = framework.startsWith('vue')

  const deps = { axios: '^1.6.0' }
  const devDeps = { vite: '^5.0.0' }

  if (isReact) {
    const ver = version === '19' ? '^19.0.0' : '^18.0.0'
    deps.react = ver
    deps['react-dom'] = ver
    devDeps['@vitejs/plugin-react'] = '^4.0.0'
  }
  if (isVue) {
    const ver = version === '2' ? '^2.7.0' : '^3.0.0'
    deps.vue = ver
    devDeps['@vitejs/plugin-vue'] = '^5.0.0'
  }
  if (isTs) {
    devDeps.typescript = '^5.0.0'
  }

  stylePkgs.forEach(pkg => { devDeps[pkg] = 'latest' })

  return JSON.stringify({
    name: `${projectName}-frontend`,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev:     'vite',
      build:   'vite build',
      preview: 'vite preview',
    },
    dependencies: deps,
    devDependencies: devDeps,
  }, null, 2)
}
