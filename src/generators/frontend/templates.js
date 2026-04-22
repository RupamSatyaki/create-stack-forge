import { getStylingImport } from '../styling/index.js'

export function generateReactMain(folders, styling) {
  const has = (f) => folders.includes(f)
  const lines = [
    `import React from 'react'`,
    `import ReactDOM from 'react-dom/client'`,
    `import App from './App'`,
  ]

  lines.push(getStylingImport(styling))

  lines.push(``, `ReactDOM.createRoot(document.getElementById('root')).render(`)
  lines.push(`  <React.StrictMode>`)
  lines.push(`    <App />`)
  lines.push(`  </React.StrictMode>`)
  lines.push(`)`, '')
  return lines.join('\n')
}

export function generateReactApp(folders) {
  const has = (f) => folders.includes(f)
  const lines = [`import React from 'react'`]

  if (has('pages')) {
    lines.push(`import { Home } from './pages/Home'`)
  }
  if (has('context')) {
    lines.push(`import { AppProvider } from './context/AppContext'`)
  }

  lines.push(``, `function App() {`)
  lines.push(`  return (`)

  if (has('context')) {
    lines.push(`    <AppProvider>`)
    lines.push(`      ${has('pages') ? '<Home />' : '<div>Hello World</div>'}`)
    lines.push(`    </AppProvider>`)
  } else {
    lines.push(`    ${has('pages') ? '<Home />' : '<div>Hello World</div>'}`)
  }

  lines.push(`  )`)
  lines.push(`}`, ``, `export default App`, '')
  return lines.join('\n')
}

export function generateHomePage() {
  return `import React from 'react'

export const Home = () => {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
}
`
}

export function generateAppContext() {
  return `import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
`
}

export function generateApiService() {
  return `import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

export default api
`
}

export function generateUseFetch() {
  return `import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e); setLoading(false) })
  }, [url])

  return { data, loading, error }
}
`
}

export function generateUtils() {
  return `export const formatDate = (date) => new Date(date).toLocaleDateString()

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const truncate = (str, n = 50) => str.length > n ? str.slice(0, n) + '...' : str
`
}

export function generateViteConfig(framework) {
  const isReact = framework.startsWith('react')
  const isVue   = framework.startsWith('vue')
  const plugin  = isReact ? `react` : isVue ? `vue` : null
  const importLine = plugin ? `import ${plugin} from '@vitejs/plugin-${plugin}'` : ''

  return `import { defineConfig } from 'vite'
${importLine}

export default defineConfig({
  plugins: [${plugin ? `${plugin}()` : ''}],
})
`
}
