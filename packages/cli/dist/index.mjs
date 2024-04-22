#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { join } from 'path';
import { SchemaReader } from './utils/SchemaReader.mjs';
import { StructBuilder } from './utils/StructBuilder.mjs';
import { InterfaceBuilder } from './utils/InterfaceBuilder.mjs';
import { format } from '@prettier/sync';

function generate(schemaPath, logging = false) {
    // Generate content
    let contentDefinition = 'import { StructCollection } from "./dist/interfaces/StructCollection";\n\n';
    let contentCommon = '';
    let contentModule = '';
    const exportNames = [];
    const schema = SchemaReader.read(schemaPath, logging);
    for (const [name, struct] of schema.entries()) {
        const path = struct.path ? `const ${name}Path = '${struct.path}'\n\n` : '';
        const template = StructBuilder.toString(name, struct.template);
        const type = new InterfaceBuilder(name, struct.template).build();
        if (path !== '')
            contentDefinition += `export declare const ${name}Path = "${struct.path}";\n\n`;
        contentDefinition += `export declare const ${name}: StructCollection;\n\n${type}\n\n`;
        contentCommon += `${path}${template}\n\n`;
        contentModule += `${path}${template}\n\n`;
        exportNames.push(name);
        path !== '' && exportNames.push(`${name}Path`);
    }
    // Write files
    writeFileSync(join(__dirname, '../schema.d.ts'), format(contentDefinition, { parser: 'typescript' }));
    writeFileSync(join(__dirname, '../schema.js'), format(`'use strict';\n\n${contentCommon}\n\n${exportNames.map((name) => `exports.${name} = ${name};`).join('\n')}`, {
        parser: 'typescript'
    }));
    writeFileSync(join(__dirname, '../schema.mjs'), format(`${contentModule}\n\nexport {${exportNames.join(',')}};`, { parser: 'typescript' }));
    console.log(`Generated ${schema.size} structs.`);
}

export { generate };
