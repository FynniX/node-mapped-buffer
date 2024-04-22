#!/usr/bin/env node
'use strict';

var CollectionType = require('../enums/CollectionType.js');

class StructBuilder {
    constructor(struct) {
        this._struct = struct !== null && struct !== void 0 ? struct : {};
    }
    addVariable(name, type) {
        this._struct[name] = type;
        return this;
    }
    addArray(name, type, size) {
        this._struct[name] = { type: CollectionType.CollectionType.Array, data: { type, size } };
        return this;
    }
    addStruct(name, struct) {
        this._struct[name] = { type: CollectionType.CollectionType.Struct, data: struct };
        return this;
    }
    build() {
        return this._struct;
    }
    static toString(name, struct) {
        return `const ${name} = ${JSON.stringify(struct, null, 2)}`;
    }
    static createArray(type, size) {
        return { type: CollectionType.CollectionType.Array, data: { type, size } };
    }
    static createStruct(struct) {
        return { type: CollectionType.CollectionType.Struct, data: struct };
    }
}

exports.StructBuilder = StructBuilder;
