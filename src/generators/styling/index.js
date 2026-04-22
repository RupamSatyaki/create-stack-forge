import { tailwindConfig, postcssConfig, tailwindCss } from './tailwind.js'

export function getStylingFiles(styling) {
  switch (styling) {
    case 'tailwind':
      return {
        'tailwind.config.js':  tailwindConfig,
        'postcss.config.js':   postcssConfig,
        'src/styles/index.css': tailwindCss,
      }
    case 'bootstrap':
      return {
        'src/styles/index.css': `/* Bootstrap imported in main entry */\n`,
      }
    case 'sass':
      return {
        'src/styles/index.scss': `// Variables\n$primary: #3490dc;\n$secondary: #ffed4a;\n\nbody {\n  margin: 0;\n  font-family: sans-serif;\n}\n`,
      }
    case 'modules':
      return {
        'src/styles/App.module.css': `.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}\n`,
      }
    case 'styled':
      return {
        'src/styles/theme.js': `export const theme = {\n  colors: {\n    primary: '#3490dc',\n    secondary: '#ffed4a',\n  },\n}\n`,
      }
    default:
      return {}
  }
}

// Returns the import line to add in main entry file
export function getStylingImport(styling) {
  switch (styling) {
    case 'tailwind':  return `import './styles/index.css'`
    case 'bootstrap': return `import 'bootstrap/dist/css/bootstrap.min.css'`
    case 'sass':      return `import './styles/index.scss'`
    default:          return `import './styles/index.css'`
  }
}
