import { writeFile } from '../../utils/fileWriter.js'
import { resolvePath } from '../../utils/pathResolver.js'

export async function generatePrettier(projectName) {
  const config = `{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
`
  await writeFile(resolvePath(projectName, '.prettierrc'), config)
}
