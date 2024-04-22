import { program } from 'commander'
import { join } from 'path'
import { CommandType } from './enums/CommandType'
import { readFileSync } from 'fs'
import { generate } from '.'

// Package.json
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

program
  .name('mapped.js')
  .version(packageJson.version)
  .arguments('<command>')
  .usage('<command>')
  .action((command: CommandType) => {
    const options = program.opts()
    const schemaPath = join(process.cwd(), options.schema ?? 'schema.map')

    switch (command) {
      case CommandType.Generate:
        generate(schemaPath)
        break
      default:
        console.log('Unknown command: ' + command)
    }
  })
  .option('-s, --schema <path>', 'Tells the path to the schema')

program.parse()
