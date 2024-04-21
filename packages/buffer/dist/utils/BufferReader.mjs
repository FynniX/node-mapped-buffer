import { CollectionType } from '../enums/CollectionType.mjs';
import { Endian } from '../enums/Endian.mjs';
import { VarType } from '../enums/VarType.mjs';
import { getVarTypeSize, getInternalType } from './index.mjs';

/**
 * @class
 * @name BufferReader
 * @description A buffer reader.
 */
class BufferReader {
    /**
     * @constructor
     * @name BufferReader
     * @param {Buffer} buffer - The buffer.
     * @param {Endian} [endian=Endian.Little] - The endianness.
     */
    constructor(buffer, endian = Endian.Little) {
        this._buffer = buffer;
        this._endian = endian;
    }
    /**
     * Reads a number value from the buffer based on the given variable type.
     *
     * @param {VarType} type - The variable type to read the number value from.
     * @return {number | null} The read number value or null if the buffer does not have enough bytes.
     */
    readNumber(type) {
        // Check if the buffer has enough bytes
        const varTypeSize = getVarTypeSize(type);
        if (!varTypeSize || this._buffer.length < varTypeSize)
            return null;
        // Get internal type
        type = getInternalType(type);
        // Read value
        let value = null;
        switch (type) {
            case VarType.int8_t:
                value = this._buffer.readInt8(0);
                break;
            case VarType.int16_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readInt16BE(0);
                else
                    value = this._buffer.readInt16LE(0);
                break;
            case VarType.int32_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readInt32BE(0);
                else
                    value = this._buffer.readInt32LE(0);
                break;
            case VarType.int64_t:
                if (this._endian === Endian.Big)
                    value = Number(this._buffer.readBigInt64BE(0));
                else
                    value = Number(this._buffer.readBigInt64LE(0));
                break;
            case VarType.uint8_t:
                value = this._buffer.readUInt8(0);
                break;
            case VarType.uint16_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readUInt16BE(0);
                else
                    value = this._buffer.readUInt16LE(0);
                break;
            case VarType.uint32_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readUInt32BE(0);
                else
                    value = this._buffer.readUInt32LE(0);
                break;
            case VarType.uint64_t:
                if (this._endian === Endian.Big)
                    value = Number(this._buffer.readBigUInt64BE(0));
                else
                    value = Number(this._buffer.readBigUInt64LE(0));
                break;
            case VarType.float:
                if (this._endian === Endian.Big)
                    value = this._buffer.readFloatBE(0);
                else
                    value = this._buffer.readFloatLE(0);
                break;
            case VarType.double:
                if (this._endian === Endian.Big)
                    value = this._buffer.readDoubleBE(0);
                else
                    value = this._buffer.readDoubleLE(0);
                break;
        }
        // Remove the bytes from the buffer
        this._buffer = this._buffer.subarray(varTypeSize);
        return value;
    }
    /**
     * Reads a boolean value from the buffer based on the given variable type.
     *
     * @param {VarType} type - The variable type to read the boolean value from.
     * @return {boolean | null} The read boolean value or null if the buffer does not have enough bytes.
     */
    readBool(type) {
        // Check if the buffer has enough bytes
        const varTypeSize = getVarTypeSize(type);
        if (!varTypeSize || this._buffer.length < varTypeSize)
            return null;
        // Get internal type
        type = getInternalType(type);
        // Read value
        let value = null;
        switch (type) {
            case VarType.int8_t:
                value = this._buffer.readInt8(0) === 1;
                break;
            case VarType.int16_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readInt16BE(0) === 1;
                else
                    value = this._buffer.readInt16LE(0) === 1;
                break;
            case VarType.int32_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readInt32BE(0) === 1;
                else
                    value = this._buffer.readInt32LE(0) === 1;
                break;
            case VarType.int64_t:
                if (this._endian === Endian.Big)
                    value = Number(this._buffer.readBigInt64BE(0)) === 1;
                else
                    value = Number(this._buffer.readBigInt64LE(0)) === 1;
                break;
            case VarType.uint8_t:
                value = this._buffer.readUInt8(0) === 1;
                break;
            case VarType.uint16_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readUInt16BE(0) === 1;
                else
                    value = this._buffer.readUInt16LE(0) === 1;
                break;
            case VarType.uint32_t:
                if (this._endian === Endian.Big)
                    value = this._buffer.readUInt32BE(0) === 1;
                else
                    value = this._buffer.readUInt32LE(0) === 1;
                break;
            case VarType.uint64_t:
                if (this._endian === Endian.Big)
                    value = Number(this._buffer.readBigUInt64BE(0)) === 1;
                else
                    value = Number(this._buffer.readBigUInt64LE(0)) === 1;
                break;
        }
        // Remove the bytes from the buffer
        this._buffer = this._buffer.subarray(varTypeSize);
        return value;
    }
    /**
     * Reads an array from a template and returns it.
     *
     * @param {ArrayCollection} template - The template of the array to read.
     * @return {unknown[]} The read array.
     */
    readArray(template) {
        const arr = [];
        for (let i = 0; i < template.size; i++) {
            // Regular type
            if (typeof template.type === 'string') {
                // Boolean type or number type
                if (template.type === VarType.bool) {
                    arr.push(this.readBool(template.type));
                }
                else {
                    arr.push(this.readNumber(template.type));
                }
            }
            // Collection type
            if (typeof template.type === 'object') {
                const collection = template.type;
                // Struct collection
                if (collection.type === CollectionType.Struct) {
                    arr.push(this.readStruct(collection.data));
                }
                // Array collection
                if (collection.type === CollectionType.Array) {
                    arr.push(this.readArray(collection.data));
                }
            }
        }
        return arr;
    }
    /**
     * Reads a struct from a template and returns it.
     *
     * @param {StructCollection} template - The template of the struct to read.
     * @return {Struct | null} The read struct or null if the template is invalid.
     */
    readStruct(template) {
        const struct = {};
        for (const key in template) {
            const varType = template[key];
            // Regular type
            if (typeof varType === 'string') {
                // Boolean type or number type
                if (varType === VarType.bool) {
                    struct[key] = this.readBool(varType);
                }
                else {
                    struct[key] = this.readNumber(varType);
                }
            }
            // Collection type
            if (typeof varType === 'object') {
                const collection = varType;
                // Struct collection
                if (collection.type === CollectionType.Struct) {
                    struct[key] = this.readStruct(collection.data);
                }
                // Array collection
                if (collection.type === CollectionType.Array) {
                    struct[key] = this.readArray(collection.data);
                }
            }
        }
        return struct;
    }
}

export { BufferReader };
