#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var SchemaReader = require('./utils/SchemaReader.js');
var StructBuilder = require('./utils/StructBuilder.js');
var InterfaceBuilder = require('./utils/InterfaceBuilder.js');
var sync = require('@prettier/sync');
var rollup = require('rollup');
var loadConfigFile_js = require('rollup/dist/loadConfigFile.js');

function generate(schemaPath, logging = false) {
    // Generate content
    let content = '';
    const schema = SchemaReader.SchemaReader.read(schemaPath, logging);
    for (const [name, struct] of schema.entries()) {
        const path = struct.path ? `export const ${name}Path = '${struct.path}'\n\n` : '';
        const template = StructBuilder.StructBuilder.toString(name, struct.template);
        const type = new InterfaceBuilder.InterfaceBuilder(name, struct.template).build();
        content += `${path}${template}\n\n${type}\n\n`;
    }
    // Write file
    fs.writeFileSync(path.join(__dirname, '../src/schema.ts'), sync.format(content, { parser: 'typescript' }));
    console.log(`Generated ${schema.size} structs.`);
}
function build(cb) {
    // Load config
    loadConfigFile_js.loadConfigFile(path.join(__dirname, '../rollup.config.mjs'), {
        input: path.join(__dirname, '../src/schema.ts')
    })
        .then(({ options, warnings }) => {
        // This prints all deferred warnings
        warnings.flush();
        for (const optionsObj of options) {
            rollup.rollup(optionsObj)
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

exports.build = build;
exports.generate = generate;
