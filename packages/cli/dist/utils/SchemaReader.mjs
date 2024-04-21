#!/usr/bin/env node
import { CharStream, CommonTokenStream } from 'antlr4';
import SchemaLexer from '../parser/SchemaLexer.mjs';
import SchemaParser from '../parser/SchemaParser.mjs';
import { StructBuilder } from './StructBuilder.mjs';
import { DeclarationType } from '../enums/DeclarationType.mjs';
import { VarType } from '../enums/VarType.mjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';

class SchemaReader {
    constructor() {
        this.structs = new Map();
    }
    visitSchema(ctx) {
        if (!ctx)
            return;
        // visit all structs
        for (const struct of ctx.struct_list())
            this.visitStruct(struct);
    }
    visitStruct(ctx) {
        var _a, _b;
        if (!ctx)
            return;
        // get path
        const path = (_b = (_a = ctx.pathCommand()) === null || _a === void 0 ? void 0 : _a.STRING().getText().replaceAll('"', '').replaceAll("'", '')) !== null && _b !== void 0 ? _b : undefined;
        // create builder for struct
        const builder = new StructBuilder();
        // visit all structs
        for (const type of ctx.type__list())
            this.visitType(type, builder);
        // save struct
        this.structs.set(ctx.NAME().getText(), { path, template: builder.build() });
    }
    visitType(ctx, builder) {
        if (!ctx)
            return;
        const name = ctx.NAME().getText();
        const type = this.getDeclarationType(ctx);
        const array = this.getArrayLength(ctx.array());
        // Primitive type
        if (type === DeclarationType.Primitive) {
            const varType = this.getVarType(ctx.primitiveType_list());
            // Not a array
            if (array.length === 0) {
                builder.addVariable(name, varType);
                return;
            }
            // Is an array
            let arr = null;
            for (let i = 1; i < array.length; i++)
                arr = StructBuilder.createArray(arr === null ? varType : arr, array[i]);
            if (arr !== null)
                builder.addArray(name, arr, array[0]);
        }
        // Struct type
        if (type === DeclarationType.User) {
            // Check weather struct exist
            const type = ctx.userType().getText();
            if (!this.structs.has(type))
                throw new Error(`Unknown struct: ${type}`);
            const struct = this.structs.get(type);
            // Not a array
            if (array.length === 0) {
                builder.addStruct(name, struct.template);
                return;
            }
            // Is an array
            let arr = null;
            for (let i = 1; i < array.length; i++)
                arr = StructBuilder.createArray(arr === null ? StructBuilder.createStruct(struct.template) : arr, array[i]);
            if (arr !== null)
                builder.addArray(name, arr, array[0]);
        }
    }
    getDeclarationType(ctx) {
        if (!ctx)
            return DeclarationType.Unknown;
        if (ctx.primitiveType_list() && ctx.primitiveType_list().length > 0)
            return DeclarationType.Primitive;
        if (ctx.userType() !== null)
            return DeclarationType.User;
        return DeclarationType.Unknown;
    }
    getArrayLength(ctx) {
        if (!ctx)
            return [];
        const arr = [];
        for (const dimension of ctx.dimension_list())
            arr.push(parseInt(dimension.NUMBER().getText()));
        return arr;
    }
    getVarType(list) {
        if (!list)
            throw new Error(`No type provided`);
        // Combine the types
        const type = list.map((ctx) => ctx.getText()).join('_');
        // Check if the type exists
        const res = Object.values(VarType).find((value) => value === type);
        if (!res)
            throw new Error(`Unknown type: ${type}`);
        return res;
    }
    getStructs() {
        return this.structs;
    }
    static read(path) {
        const stream = new CharStream(readFileSync(resolve(path), 'utf-8'));
        const lexer = new SchemaLexer(stream);
        const tokens = new CommonTokenStream(lexer);
        const parser = new SchemaParser(tokens);
        const visitor = new SchemaReader();
        visitor.visitSchema(parser.schema());
        return visitor.getStructs();
    }
}

export { SchemaReader };
