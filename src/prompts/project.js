import * as p from '@clack/prompts'

export async function promptProjectName(existing) {
  if (existing) return existing

  const name = await p.text({
    message: 'Project name:',
    placeholder: 'my-app',
    validate: (v) => {
      if (!v) return 'Project name is required'
      if (/[^a-zA-Z0-9-_]/.test(v)) return 'Only letters, numbers, hyphens and underscores allowed'
    },
  })

  if (p.isCancel(name)) return null
  return name
}
