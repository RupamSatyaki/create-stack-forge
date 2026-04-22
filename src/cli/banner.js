import chalk from 'chalk'

export function showBanner() {
  console.log(chalk.cyan(`
  ╔═══════════════════════════════════════════╗
  ║                                           ║
  ║   ⚡  create-stack-forge                  ║
  ║   Scaffold fullstack apps in seconds      ║
  ║                                           ║
  ╚═══════════════════════════════════════════╝
  `))
}
