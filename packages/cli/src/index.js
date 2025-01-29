#!/usr/bin/env node

import { Command } from 'commander'
import packageJson from '../package.json' with { type: 'json' }
import { dump } from './commands/dump.js'
import { init } from './commands/init.js'
import { load } from './commands/load.js'

const program = new Command()

program.description(`CLI for managing the source.coop DynamoDB tables.

It expects a local aws config to be set through environment variables:
 AWS_ACCESS_KEY_ID
 AWS_SECRET_ACCESS_KEY
 AWS_REGION`)

program.option('--production', 'Operate on the production environment')
program.version(packageJson.version)

program
  .command('init')
  .description('Create the DynamoDB tables')
  .action(() => {
    init(program.opts().production)
  })

program
  .command('dump')
  .description('Dump the contents of all DynamoDB tables to JSON files')
  .argument('<output>', 'Output directory')
  .action((output) => {
    dump(output, program.opts().production)
  })

program
  .command('load')
  .description('Load data into DynamoDB from the specified directory')
  .argument('<loadDirectory>', 'Load Directory')
  .action((loadDirectory) => {
    load(loadDirectory, program.opts().production)
  })

program.parse(process.argv)
