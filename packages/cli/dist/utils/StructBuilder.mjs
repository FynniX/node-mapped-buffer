#!/usr/bin/env node
import { CollectionType } from '../enums/CollectionType.mjs';

class StructBuilder {
    constructor(struct) {
        this._struct = struct !== null && struct !== void 0 ? struct : {};
    }
    addVariable(name, type) {
        this._struct[name] = type;
        return this;
    }
    addArray(name, type, size) {
        this._struct[name] = { type: CollectionType.Array, data: { type, size } };
        return this;
    }
    addStruct(name, struct) {
        this._struct[name] = { type: CollectionType.Struct, data: struct };
        return this;
    }
    build() {
        return this._struct;
    }
    static toString(name, struct) {
        return `export const ${name} = ${JSON.stringify(struct, null, 2)}`;
    }
    static createArray(type, size) {
        return { type: CollectionType.Array, data: { type, size } };
    }
    static createStruct(struct) {
        return { type: CollectionType.Struct, data: struct };
    }
}

export { StructBuilder };
