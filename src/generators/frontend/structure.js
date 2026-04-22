import { writeFile, ensureDir } from '../../utils/fileWriter.js'
import { frontendPath } from '../../utils/pathResolver.js'
import { generateReactMain, generateReactApp, generateHomePage, generateAppContext, generateApiService, generateUseFetch, generateUtils, generateViteConfig } from './templates.js'
import { generateFrontendPackageJson } from './packageJson.js'
import { getStylingFiles } from '../styling/index.js'

export async function generateFrontend(projectName, config) {
  const { framework, styling, folders } = config
  const has = (f) => folders.includes(f)
  const base = (p) => frontendPath(projectName, p)

  // Entry files
  if (framework.startsWith('react')) {
    await writeFile(base('src/main.jsx'), generateReactMain(folders, styling))
    await writeFile(base('src/App.jsx'), generateReactApp(folders))
  } else if (framework.startsWith('vue')) {
    await writeFile(base('src/main.js'), `import { createApp } from 'vue'\nimport App from './App.vue'\n\ncreateApp(App).mount('#app')\n`)
    await writeFile(base('src/App.vue'), `<template>\n  <div>Hello Vue</div>\n</template>\n\n<script setup>\n</script>\n`)
  } else {
    await writeFile(base('src/main.js'), `console.log('Hello World')\n`)
  }

  // pages
  if (has('pages')) {
    await writeFile(base('src/pages/Home.jsx'), generateHomePage())
  }

  // context
  if (has('context')) {
    await writeFile(base('src/context/AppContext.jsx'), generateAppContext())
  }

  // services
  if (has('services')) {
    await writeFile(base('src/services/api.js'), generateApiService())
  }

  // hooks
  if (has('hooks')) {
    await writeFile(base('src/hooks/useFetch.js'), generateUseFetch())
  }

  // utils
  if (has('utils')) {
    await writeFile(base('src/utils/index.js'), generateUtils())
  }

  // components
  if (has('components')) {
    await writeFile(base('src/components/index.js'), `// Export your components here\n`)
  }

  // assets
  if (has('assets')) {
    await ensureDir(base('src/assets'))
  }

  // styles
  if (has('styles') && styling === 'none') {
    await writeFile(base('src/styles/index.css'), `body {\n  margin: 0;\n  font-family: sans-serif;\n}\n`)
  }

  // Styling files
  const stylingFiles = getStylingFiles(styling)
  for (const [relPath, content] of Object.entries(stylingFiles)) {
    await writeFile(base(relPath), content)
  }

  // index.html
  await writeFile(base('index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
`)

  // vite.config.js
  await writeFile(base('vite.config.js'), generateViteConfig(framework))

  // package.json
  await writeFile(base('package.json'), generateFrontendPackageJson(projectName, framework, styling, config.version || '18'))

  // .gitignore
  await writeFile(base('.gitignore'), `node_modules\ndist\n.env\n`)

  // .env
  await writeFile(base('.env'), `VITE_API_URL=http://localhost:3000/api\n`)
}
