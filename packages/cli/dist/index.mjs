#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { join } from 'path';
import { SchemaReader } from './utils/SchemaReader.mjs';
import { StructBuilder } from './utils/StructBuilder.mjs';
import { InterfaceBuilder } from './utils/InterfaceBuilder.mjs';
import { format } from '@prettier/sync';
import { rollup } from 'rollup';
import { loadConfigFile } from 'rollup/dist/loadConfigFile.js';

function generate(schemaPath, logging = false) {
    // Generate content
    let content = "";
    const schema = SchemaReader.read(schemaPath, logging);
    for (const [name, struct] of schema.entries()) {
        const path = struct.path ? `export const ${name}Path = '${struct.path}'\n\n` : '';
        const template = StructBuilder.toString(name, struct.template);
        const type = new InterfaceBuilder(name, struct.template).build();
        content += `${path}${template}\n\n${type}\n\n`;
    }
    // Write file
    writeFileSync(join(__dirname, '../src/schema.ts'), format(content, { parser: 'typescript' }));
    console.log(`Generated ${schema.size} structs.`);
}
function build(cb) {
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
                    bundle.close();
                    // Build successfully
                    console.log('Build successfully.');
                    if (cb)
                        cb();
                })
                    .catch((error) => {
                    if (cb)
                        cb(error);
                    throw error;
                });
            })
                .catch((error) => {
                if (cb)
                    cb(error);
                throw error;
            });
        }
    })
        .catch((error) => {
        if (cb)
            cb(error);
        throw error;
    });
}

export { build, generate };
