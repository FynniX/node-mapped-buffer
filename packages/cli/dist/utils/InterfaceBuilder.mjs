#!/usr/bin/env node
import { CollectionType } from '../enums/CollectionType.mjs';
import { TypescriptType } from '../enums/TypescriptType.mjs';
import { VarType } from '../enums/VarType.mjs';

class InterfaceBuilder {
    constructor(name, struct) {
        this._interface = '';
        this._name = name;
        this._struct = struct;
    }
    readStruct(template) {
        let struct = '{\n';
        for (const key in template) {
            const varType = template[key];
            // Regular type
            if (typeof varType === 'string') {
                struct += `${key}: ${this.getTypescriptType(varType)};\n`;
            }
            // Collection type
            if (typeof varType === 'object') {
                const collection = varType;
                // Struct collection
                if (collection.type === CollectionType.Struct) {
                    struct += `${key}: (${this.readStruct(collection.data)});\n`;
                }
                // Array collection
                if (collection.type === CollectionType.Array) {
                    const type = this.getArrayType(collection.data);
                    const dimension = this.getArrayDimension(collection.data);
                    if (typeof type === 'object') {
                        struct += `${key}: (${this.readStruct(collection.data)})[];\n`;
                    }
                    if (typeof type === 'string') {
                        struct += `${key}: ${this.getTypescriptType(type, true)}${'[]'.repeat(dimension)};\n`;
                    }
                }
            }
        }
        struct += '}';
        return struct;
    }
    getTypescriptType(type, isArray = false) {
        // Check weather the type is a bool
        if (type === VarType.bool)
            return TypescriptType.Boolean;
        // Check weather the type is a char array
        if (isArray && type === VarType.char)
            return TypescriptType.String;
        if (isArray && type === VarType.char16_t)
            return TypescriptType.String;
        if (isArray && type === VarType.char32_t)
            return TypescriptType.String;
        if (isArray && type === VarType.wchar_t)
            return TypescriptType.String;
        // All other cases number
        return TypescriptType.Number;
    }
    getArrayType(template) {
        // Collection type
        if (typeof template.type === 'object') {
            const collection = template.type;
            // Struct collection
            if (collection.type === CollectionType.Struct) {
                return collection.data;
            }
            // Array collection
            if (collection.type === CollectionType.Array) {
                return this.getArrayType(collection.data);
            }
        }
        return template.type;
    }
    getArrayDimension(template, dim = 0) {
        // Collection type
        if (typeof template.type === 'object') {
            const collection = template.type;
            // Array collection
            if (collection.type === CollectionType.Array) {
                return this.getArrayDimension(collection.data, dim + 1);
            }
        }
        return dim + 1;
    }
    build() {
        // set interface
        this._interface = `export interface I${this._name} ${this.readStruct(this._struct)}\n`;
        return this._interface;
    }
}

export { InterfaceBuilder };
