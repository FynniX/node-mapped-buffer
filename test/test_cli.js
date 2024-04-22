const { generate } = require('../packages/cli')
const path = require('path')
const assert = require('assert')

assert(generate, 'Generate function is undefined')

const schemaPath = path.join(__dirname, 'test_schema.map')
const schemaPath2 = path.join(__dirname, 'test_schema_failure.map')

// Test generate
assert.throws(() => generate(schemaPath2), 'Generate did not throw an exception')
assert.doesNotThrow(() => generate(schemaPath), 'Generate did throw an exception')

console.log('CLI: All tests passed - everything looks OK!')
