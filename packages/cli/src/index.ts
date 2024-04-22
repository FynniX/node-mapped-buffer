import { writeFileSync } from 'fs'
import { join } from 'path'
import { SchemaReader } from './utils/SchemaReader'
import { StructBuilder } from './utils/StructBuilder'
import { InterfaceBuilder } from './utils/InterfaceBuilder'
import { format } from '@prettier/sync'

export function generate(schemaPath: string, logging: boolean = false) {
  // Generate content
  let contentTs = ''
  let contentDts = ''
  let contentJs = ''
  let contentMjs = ''
  const exportNames = []
  const schema = SchemaReader.read(schemaPath, logging)
  for (const [name, struct] of schema.entries()) {
    const path = struct.path ? `export const ${name}Path = '${struct.path}'\n\n` : ''
    const template = StructBuilder.toString(name, struct.template)
    const type = new InterfaceBuilder(name, struct.template).build()
    if (path !== '') contentDts += `export declare const ${name}Path = "${struct.path}";\n\n`
    contentDts += `export declare const ${name}: I${name};\n\n${type}\n\n`
    contentTs += `${path}${template}\n\n${type}\n\n`
    contentJs += `${path}${template}\n\n`
    contentMjs += `${path}${template}\n\n`
    exportNames.push(name)
    path !== '' && exportNames.push(`${name}Path`)
  }

  // Write files
  writeFileSync(join(__dirname, '../src/schema.ts'), format(contentTs, { parser: 'typescript' }))
  writeFileSync(join(__dirname, '../dist/schema.d.ts'), format(contentDts, { parser: 'typescript' }))
  writeFileSync(
    join(__dirname, '../dist/schema.js'),
    format(`'use strict';\n\n${contentJs}\n\n${exportNames.map((name) => `exports.${name} = ${name};`).join('\n')}`, {
      parser: 'typescript'
    })
  )
  writeFileSync(
    join(__dirname, '../dist/schema.mjs'),
    format(`${contentMjs}\n\nexport {${exportNames.join(',')}};`, { parser: 'typescript' })
  )

  console.log(`Generated ${schema.size} structs.`)
}
