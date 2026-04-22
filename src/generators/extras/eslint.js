import { writeFile } from '../../utils/fileWriter.js'
import { resolvePath } from '../../utils/pathResolver.js'

export async function generateEslint(projectName) {
  const config = `module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
}
`
  await writeFile(resolvePath(projectName, '.eslintrc.js'), config)
}
