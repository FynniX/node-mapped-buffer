#!/usr/bin/env node
'use strict';

var antlr4 = require('antlr4');
var SchemaLexer = require('../parser/SchemaLexer.js');
var SchemaParser = require('../parser/SchemaParser.js');
var StructBuilder = require('./StructBuilder.js');
var DeclarationType = require('../enums/DeclarationType.js');
var VarType = require('../enums/VarType.js');
var fs = require('fs');
var path = require('path');

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
        const builder = new StructBuilder.StructBuilder();
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
        if (type === DeclarationType.DeclarationType.Primitive) {
            const varType = this.getVarType(ctx.primitiveType_list());
            // Not a array
            if (array.length === 0) {
                builder.addVariable(name, varType);
                return;
            }
            // Is an array
            let arr = null;
            for (let i = 1; i < array.length; i++)
                arr = StructBuilder.StructBuilder.createArray(arr === null ? varType : arr, array[i]);
            if (arr !== null)
                builder.addArray(name, arr, array[0]);
        }
        // Struct type
        if (type === DeclarationType.DeclarationType.User) {
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
                arr = StructBuilder.StructBuilder.createArray(arr === null ? StructBuilder.StructBuilder.createStruct(struct.template) : arr, array[i]);
            if (arr !== null)
                builder.addArray(name, arr, array[0]);
        }
    }
    getDeclarationType(ctx) {
        if (!ctx)
            return DeclarationType.DeclarationType.Unknown;
        if (ctx.primitiveType_list() && ctx.primitiveType_list().length > 0)
            return DeclarationType.DeclarationType.Primitive;
        if (ctx.userType() !== null)
            return DeclarationType.DeclarationType.User;
        return DeclarationType.DeclarationType.Unknown;
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
        const res = Object.values(VarType.VarType).find((value) => value === type);
        if (!res)
            throw new Error(`Unknown type: ${type}`);
        return res;
    }
    getStructs() {
        return this.structs;
    }
    static read(path$1, logging = false) {
        const stream = new antlr4.CharStream(fs.readFileSync(path.resolve(path$1), 'utf-8'));
        const lexer = new SchemaLexer.default(stream);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new SchemaParser.default(tokens);
        if (!logging)
            parser.removeErrorListeners();
        parser.addErrorListener({
            syntaxError(_, __, line, column, msg) {
                throw new Error('line ' + line + ':' + column + ' ' + msg);
            }
        });
        const visitor = new SchemaReader();
        visitor.visitSchema(parser.schema());
        return visitor.getStructs();
    }
}

exports.SchemaReader = SchemaReader;
