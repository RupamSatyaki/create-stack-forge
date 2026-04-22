import { FRONTEND_FOLDERS } from '../../constants/folders.js'
import { renderFolderSelect } from '../../wireframe/renderSelect.js'

export async function promptFrontendFolders(projectName) {
  const folders = await renderFolderSelect({
    options:       FRONTEND_FOLDERS,
    initialValues: ['components', 'pages', 'utils'],
    projectName,
    part: 'frontend',
  })
  return folders
}
