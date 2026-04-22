#!/usr/bin/env node
import { program } from 'commander'
import { run } from '../src/cli/index.js'
import { runUpdate } from '../src/commands/update.js'

program
  .name('create-stack-forge')
  .description('Scaffold fullstack apps in seconds')
  .argument('[project-name]', 'Name of the project')
  .option('--default', 'Use default preset (React + Express + MongoDB + Tailwind)')
  .option('--only <part>', 'Scaffold only frontend or backend')
  .option('--frontend <framework>', 'Frontend framework (react, vue, vanilla)')
  .option('--backend <framework>', 'Backend framework (express, fastify)')
  .option('--db <database>', 'Database (mongodb, pg, mysql, prisma, redis, firebase, supabase)')
  .option('--css <styling>', 'CSS framework (tailwind, bootstrap, sass, modules, styled)')
  .option('--dry-run', 'Preview what would be generated without creating files')
  .action(async (projectName, options) => {
    await run(projectName, options)
  })

// update subcommand
program
  .command('update [path]')
  .description('Update config files of an existing create-stack-forge project')
  .option('--dry-run', 'Preview changes without applying them')
  .action(async (projectPath, options) => {
    await runUpdate(projectPath || '.', options)
  })

program.parse()
