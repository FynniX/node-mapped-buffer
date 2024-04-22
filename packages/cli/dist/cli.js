#!/usr/bin/env node
'use strict';

var commander = require('commander');
var path = require('path');
var CommandType = require('./enums/CommandType.js');
var fs = require('fs');
var index = require('./index.js');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
// Package.json
const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('cli.js', document.baseURI).href))), 'utf8'));
commander.program
    .name('mapped.js')
    .version(packageJson.version)
    .arguments('<command>')
    .usage('<command>')
    .action((command) => {
    var _a;
    const options = commander.program.opts();
    const schemaPath = path.join(process.cwd(), (_a = options.schema) !== null && _a !== void 0 ? _a : 'schema.map');
    switch (command) {
        case CommandType.CommandType.Generate:
            index.generate(schemaPath);
            break;
        default:
            console.log('Unknown command: ' + command);
    }
})
    .option('-s, --schema <path>', 'Tells the path to the schema');
commander.program.parse();
