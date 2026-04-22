import * as p from '@clack/prompts'

export async function promptExtras() {
  p.intro('── EXTRAS ────────────────────────────────────')

  const extras = await p.multiselect({
    message: 'Optional extras:',
    options: [
      { value: 'gitInit',   label: 'Git init' },
      { value: 'env',       label: '.env + .env.example' },
      { value: 'eslint',    label: 'ESLint' },
      { value: 'prettier',  label: 'Prettier' },
      { value: 'docker',    label: 'Docker (Dockerfile + compose)' },
    ],
    initialValues: ['env'],
    required: false,
  })

  if (p.isCancel(extras)) return null

  return {
    gitInit:  extras.includes('gitInit'),
    env:      extras.includes('env'),
    eslint:   extras.includes('eslint'),
    prettier: extras.includes('prettier'),
    docker:   extras.includes('docker'),
  }
}
