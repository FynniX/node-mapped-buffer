const MappedBuffer = require('../packages/buffer/dist/index.js').MappedBuffer
const { TestB, TestBPath } = require('../packages/cli/dist/schema.js')
const assert = require('assert')

assert(MappedBuffer, 'MappedBuffer is undefined')
assert(TestB, 'TestB is undefined. You need to test the cli first.')
assert(TestBPath, 'TestBPath is undefined. You need to test the cli first.')

// buffer should throw when no arguments are passed
assert.throws(() => new MappedBuffer(), "MappedBuffer didn't throw an exception")

const instance = new MappedBuffer(TestBPath, TestB)

// Validate all functions
assert.doesNotThrow(() => {
  assert(instance.create, 'Create function is undefined')
  assert(instance.open, 'Open function is undefined')
  assert(instance.read, 'Read function is undefined')
  assert(instance.write, 'Write function is undefined')
  assert(instance.close, 'Close function is undefined')
}, 'Not all functions are defined')

// Create buffer for testing
assert.doesNotThrow(() => instance.create(), 'Create did throw an exception')

// Test weather read returns struct
assert.notStrictEqual(instance.read(), undefined, "Read didn't return a value")

// Test weather write works
let data = instance.read()
data['d'] = 100
assert.doesNotThrow(() => instance.write(data), 'Write did throw an exception')
data = instance.read()
assert.strictEqual(data['d'], 100, 'Changed value is not correct')

// Test weather close works
assert.doesNotThrow(() => instance.close(), 'Close did throw an exception')

console.log('Buffer: All tests passed - everything looks OK!')
