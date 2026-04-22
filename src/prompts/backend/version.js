import * as p from '@clack/prompts'
import { BACKEND_VERSIONS } from '../../constants/versions.js'

export async function promptBackendVersion(framework) {
  const versions = BACKEND_VERSIONS[framework]
  if (!versions || versions.length <= 1) return versions?.[0]?.value || 'latest'

  const version = await p.select({
    message: `${framework.split('-')[0]} version:`,
    options: versions,
  })

  if (p.isCancel(version)) return null
  return version
}
