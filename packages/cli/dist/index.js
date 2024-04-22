#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var SchemaReader = require('./utils/SchemaReader.js');
var StructBuilder = require('./utils/StructBuilder.js');
var InterfaceBuilder = require('./utils/InterfaceBuilder.js');
var sync = require('@prettier/sync');

function generate(schemaPath, logging = false) {
    // Generate content
    let contentTs = '';
    let contentDts = '';
    let contentJs = '';
    let contentMjs = '';
    const exportNames = [];
    const schema = SchemaReader.SchemaReader.read(schemaPath, logging);
    for (const [name, struct] of schema.entries()) {
        const path = struct.path ? `export const ${name}Path = '${struct.path}'\n\n` : '';
        const template = StructBuilder.StructBuilder.toString(name, struct.template);
        const type = new InterfaceBuilder.InterfaceBuilder(name, struct.template).build();
        if (path !== '')
            contentDts += `export declare const ${name}Path = "${struct.path}";\n\n`;
        contentDts += `export declare const ${name}: I${name};\n\n${type}\n\n`;
        contentTs += `${path}${template}\n\n${type}\n\n`;
        contentJs += `${path}${template}\n\n`;
        contentMjs += `${path}${template}\n\n`;
        exportNames.push(name);
        path !== '' && exportNames.push(`${name}Path`);
    }
    // Write files
    fs.writeFileSync(path.join(__dirname, '../src/schema.ts'), sync.format(contentTs, { parser: 'typescript' }));
    fs.writeFileSync(path.join(__dirname, '../dist/schema.d.ts'), sync.format(contentDts, { parser: 'typescript' }));
    fs.writeFileSync(path.join(__dirname, '../dist/schema.js'), sync.format(`'use strict';\n\n${contentJs}\n\n${exportNames.map((name) => `exports.${name} = ${name};`).join('\n')}`, {
        parser: 'typescript'
    }));
    fs.writeFileSync(path.join(__dirname, '../dist/schema.mjs'), sync.format(`${contentMjs}\n\nexport {${exportNames.join(',')}};`, { parser: 'typescript' }));
    console.log(`Generated ${schema.size} structs.`);
}

exports.generate = generate;
