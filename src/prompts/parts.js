import * as p from '@clack/prompts'

export async function promptParts(config) {
  // Already set via --only flag
  if (config.includeFrontend !== undefined) {
    return { includeFrontend: config.includeFrontend, includeBackend: config.includeBackend }
  }

  const parts = await p.multiselect({
    message: 'What to include?',
    options: [
      { value: 'frontend', label: 'Frontend' },
      { value: 'backend',  label: 'Backend' },
    ],
    initialValues: ['frontend', 'backend'],
  })

  if (p.isCancel(parts)) return null

  return {
    includeFrontend: parts.includes('frontend'),
    includeBackend:  parts.includes('backend'),
  }
}
