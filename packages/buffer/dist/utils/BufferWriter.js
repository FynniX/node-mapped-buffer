'use strict';

var CollectionType = require('../enums/CollectionType.js');
var Endian = require('../enums/Endian.js');
var VarType = require('../enums/VarType.js');
var index = require('./index.js');

/**
 * @class
 * @name BufferWriter
 * @description A buffer writer.
 */
class BufferWriter {
    /**
     * @constructor
     * @name BufferWriter
     * @param {Endian} [endian=Endian.Little] - The endianness.
     */
    constructor(endian = Endian.Endian.Little) {
        /**
         * @private
         * @name _buffer
         * @description The buffer.
         */
        this._buffer = Buffer.alloc(0);
        this._endian = endian;
    }
    /**
     * Writes a number to the buffer based on the specified type.
     *
     * @param {VarType} type - The type of the number.
     * @param {number} value - The value to write.
     * @return {void} This function does not return anything.
     */
    writeNumber(type, value) {
        // Check weather the type is supported
        const varTypeSize = index.getVarTypeSize(type);
        if (!varTypeSize)
            return;
        // Get internal type
        type = index.getInternalType(type);
        // Write temp buffer
        const tmpBuffer = Buffer.alloc(varTypeSize);
        switch (type) {
            case VarType.VarType.int8_t:
                tmpBuffer.writeInt8(value);
                break;
            case VarType.VarType.int16_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeInt16BE(value);
                else
                    tmpBuffer.writeInt16LE(value);
                break;
            case VarType.VarType.int32_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeInt32BE(value);
                else
                    tmpBuffer.writeInt32LE(value);
                break;
            case VarType.VarType.int64_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeBigInt64BE(BigInt(value));
                else
                    tmpBuffer.writeBigInt64LE(BigInt(value));
                break;
            case VarType.VarType.uint8_t:
                tmpBuffer.writeUInt8(value);
                break;
            case VarType.VarType.uint16_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeUInt16BE(value);
                else
                    tmpBuffer.writeUInt16LE(value);
                break;
            case VarType.VarType.uint32_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeUInt32BE(value);
                else
                    tmpBuffer.writeUInt32LE(value);
                break;
            case VarType.VarType.uint64_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeBigUInt64BE(BigInt(value));
                else
                    tmpBuffer.writeBigUInt64LE(BigInt(value));
                break;
            case VarType.VarType.float:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeFloatBE(value);
                else
                    tmpBuffer.writeFloatLE(value);
                break;
            case VarType.VarType.double:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeDoubleBE(value);
                else
                    tmpBuffer.writeDoubleLE(value);
                break;
        }
        // Combine the buffers
        this._buffer = Buffer.concat([this._buffer, tmpBuffer]);
    }
    /**
     * Writes a boolean value to the buffer based on the specified type.
     *
     * @param {VarType} type - The type of the boolean value.
     * @param {boolean} value - The boolean value to write.
     * @return {void} This function does not return anything.
     */
    writeBool(type, value) {
        // Check weather the type is supported
        const varTypeSize = index.getVarTypeSize(type);
        if (!varTypeSize)
            return;
        // Get internal type
        type = index.getInternalType(type);
        // Write temp buffer
        const tmpBuffer = Buffer.alloc(varTypeSize);
        switch (type) {
            case VarType.VarType.int8_t:
                tmpBuffer.writeInt8(value ? 1 : 0);
                break;
            case VarType.VarType.int16_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeInt16BE(value ? 1 : 0);
                else
                    tmpBuffer.writeInt16LE(value ? 1 : 0);
                break;
            case VarType.VarType.int32_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeInt32BE(value ? 1 : 0);
                else
                    tmpBuffer.writeInt32LE(value ? 1 : 0);
                break;
            case VarType.VarType.int64_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeBigInt64BE(BigInt(value ? 1 : 0));
                else
                    tmpBuffer.writeBigInt64LE(BigInt(value ? 1 : 0));
                break;
            case VarType.VarType.uint8_t:
                tmpBuffer.writeUInt8(value ? 1 : 0);
                break;
            case VarType.VarType.uint16_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeUInt16BE(value ? 1 : 0);
                else
                    tmpBuffer.writeUInt16LE(value ? 1 : 0);
                break;
            case VarType.VarType.uint32_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeUInt32BE(value ? 1 : 0);
                else
                    tmpBuffer.writeUInt32LE(value ? 1 : 0);
                break;
            case VarType.VarType.uint64_t:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeBigUInt64BE(BigInt(value ? 1 : 0));
                else
                    tmpBuffer.writeBigUInt64LE(BigInt(value ? 1 : 0));
                break;
            case VarType.VarType.float:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeFloatBE(value ? 1 : 0);
                else
                    tmpBuffer.writeFloatLE(value ? 1 : 0);
                break;
            case VarType.VarType.double:
                if (this._endian === Endian.Endian.Big)
                    tmpBuffer.writeDoubleBE(value ? 1 : 0);
                else
                    tmpBuffer.writeDoubleLE(value ? 1 : 0);
                break;
        }
        // Combine the buffers
        this._buffer = Buffer.concat([this._buffer, tmpBuffer]);
    }
    /**
     * Writes an array to the buffer based on the given template and value.
     *
     * @param {ArrayCollection} template - The template of the array to write.
     * @param {unknown[]} value - The array to write.
     * @return {void} This function does not return anything.
     */
    writeArray(template, value) {
        for (let i = 0; i < template.size; i++) {
            // Regular type
            if (typeof template.type === 'string') {
                // Boolean type or number type
                if (template.type === VarType.VarType.bool) {
                    this.writeBool(template.type, value[i]);
                }
                else {
                    this.writeNumber(template.type, value[i]);
                }
            }
            // Collection type
            if (typeof template.type === 'object') {
                const collection = template.type;
                // Struct collection
                if (collection.type === CollectionType.CollectionType.Struct) {
                    this.writeStruct(collection.data, value[i]);
                }
                // Array collection
                if (collection.type === CollectionType.CollectionType.Array) {
                    this.writeArray(collection.data, value[i]);
                }
            }
        }
    }
    /**
     * A description of the entire function.
     *
     * @param {StructCollection} template - The template of the struct to write.
     * @param {Struct} value - The struct value to write.
     * @return {void} This function does not return anything.
     */
    writeStruct(template, value) {
        for (const key in template) {
            const varType = template[key];
            // Regular type
            if (typeof varType === 'string') {
                // Boolean type or number type
                if (varType === VarType.VarType.bool) {
                    this.writeBool(varType, value[key]);
                }
                else {
                    this.writeNumber(varType, value[key]);
                }
            }
            // Collection type
            if (typeof varType === 'object') {
                const collection = varType;
                // Struct collection
                if (collection.type === CollectionType.CollectionType.Struct) {
                    this.writeStruct(collection.data, value[key]);
                }
                // Array collection
                if (collection.type === CollectionType.CollectionType.Array) {
                    this.writeArray(collection.data, value[key]);
                }
            }
        }
    }
    /**
     * A description of the entire function.
     *
     * @return {Buffer} description of return value
     */
    getBuffer() {
        return this._buffer;
    }
}

exports.BufferWriter = BufferWriter;
