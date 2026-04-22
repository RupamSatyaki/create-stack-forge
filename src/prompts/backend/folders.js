import { BACKEND_FOLDERS } from '../../constants/folders.js'
import { renderFolderSelect } from '../../wireframe/renderSelect.js'

export async function promptBackendFolders(projectName) {
  const folders = await renderFolderSelect({
    options:       BACKEND_FOLDERS,
    initialValues: ['routes', 'controllers', 'models', 'config'],
    projectName,
    part: 'backend',
  })
  return folders
}
