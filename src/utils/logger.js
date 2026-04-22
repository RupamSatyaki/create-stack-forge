import chalk from 'chalk'

export const logger = {
  info:    (msg) => console.log(chalk.blue('  ℹ ') + msg),
  success: (msg) => console.log(chalk.green('  ✔ ') + msg),
  error:   (msg) => console.log(chalk.red('  ✖ ') + msg),
  warn:    (msg) => console.log(chalk.yellow('  ⚠ ') + msg),

  // File operation logs
  created: (file) => console.log(chalk.green('  ✔ Created  ') + chalk.dim(file)),
  updated: (file) => console.log(chalk.cyan('  ↺ Updated  ') + chalk.dim(file)),
  skipped: (file) => console.log(chalk.yellow('  ⚡ Skipped  ') + chalk.dim(file)),
  dryRun:  (msg)  => console.log(chalk.magenta('  ◆ dry-run  ') + chalk.dim(msg)),
  deleted: (file) => console.log(chalk.red('  ✖ Deleted  ') + chalk.dim(file)),
}
