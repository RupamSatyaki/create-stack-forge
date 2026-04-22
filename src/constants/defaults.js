export const DEFAULT_PRESET = {
  includeFrontend: true,
  includeBackend: true,
  frontend: {
    framework: 'react-js',
    version: '18',
    styling: 'tailwind',
    folders: ['components', 'pages', 'hooks', 'utils', 'context', 'services', 'assets', 'styles'],
  },
  backend: {
    framework: 'express-js',
    version: '4',
    database: 'mongodb',
    folders: ['routes', 'controllers', 'models', 'config', 'middlewares', 'utils'],
  },
  extras: {
    gitInit: true,
    env: true,
    eslint: false,
    prettier: false,
    docker: false,
  },
}
