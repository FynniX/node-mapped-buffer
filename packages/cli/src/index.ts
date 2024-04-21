import { writeFileSync } from "fs"
import { join } from "path"
import { SchemaReader } from "./utils/SchemaReader"
import { StructBuilder } from "./utils/StructBuilder"
import { InterfaceBuilder } from "./utils/InterfaceBuilder"
import { format } from "@prettier/sync"
import { rollup } from "rollup"
import { loadConfigFile } from "rollup/dist/loadConfigFile.js"

export function generate(schemaPath: string) {
    // Generate content
    let content = ""
    const schema = SchemaReader.read(schemaPath)
    for (const [name, struct] of schema.entries()) {
        const path = struct.path ? `export const ${name}Path = '${struct.path}'\n\n` : ''
        const template = StructBuilder.toString(name, struct.template)
        const type = new InterfaceBuilder(name, struct.template).build()
        content += `${path}${template}\n\n${type}\n\n`
    }

    // Write file
    writeFileSync(join(__dirname, '../src/schema.ts'), format(content, { parser: 'typescript' }))

    console.log(`Generated ${schema.size} structs.`)
}

export function build() {
    // Load config
    loadConfigFile(join(__dirname, '../rollup.config.mjs'), {
        input: join(__dirname, '../src/schema.ts'),
    })
        .then(({ options, warnings }) => {
            // This prints all deferred warnings
            warnings.flush();

            for (const optionsObj of options) {
                rollup(optionsObj)
                    .then((bundle) => {
                        Promise.all(optionsObj.output.map(bundle.write))
                            .then(() => {
                                // Close bundle
                                bundle.close()

                                console.log('Build successfully.')
                            })
                            .catch((error) => {
                                throw error
                            })
                    })
                    .catch((error) => {
                        throw error
                    })
            }
        })
        .catch((error) => {
            throw error
        })
}