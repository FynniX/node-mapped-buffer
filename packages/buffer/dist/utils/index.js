'use strict';

var CollectionType = require('../enums/CollectionType.js');
var VarType = require('../enums/VarType.js');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require('../../build/Release/mapped-buffer');
/**
 * Returns the size of the given variable type.
 *
 * @param {VarType} type - The variable type to get the size of.
 * @return {number | undefined} The size of the variable type, or undefined if the type is not recognized.
 */
const getVarTypeSize = (type) => {
    return addon.getVarTypeSize(type);
};
/**
 * Calculates the size of a struct based on the given struct collection.
 *
 * @param {StructCollection} struct - The struct collection to calculate the size of.
 * @return {number} The size of the struct.
 */
const calculateStructSize = (struct) => {
    var _a;
    let size = 0;
    for (const key in struct) {
        const varType = struct[key];
        // Regular type
        if (typeof varType === 'string') {
            size += (_a = getVarTypeSize(varType)) !== null && _a !== void 0 ? _a : 0;
        }
        // Collection type
        if (typeof varType === 'object') {
            const collection = varType;
            // Struct collection
            if (collection.type === CollectionType.CollectionType.Struct) {
                size += calculateStructSize(collection.data);
            }
            // Array collection
            if (collection.type === CollectionType.CollectionType.Array) {
                size += calculateArraySize(collection.data);
            }
        }
    }
    return size;
};
/**
 * Calculates the size of an array based on the given array collection.
 *
 * @param {ArrayCollection} arr - The array collection to calculate the size of.
 * @return {number} The size of the array.
 */
const calculateArraySize = (arr) => {
    var _a;
    let size = 0;
    // Regular type
    if (typeof arr.type === 'string') {
        size += ((_a = getVarTypeSize(arr.type)) !== null && _a !== void 0 ? _a : 0) * arr.size;
    }
    // Collection type
    if (typeof arr.type === 'object') {
        const arrayType = arr.type;
        // Struct collection
        if (arrayType.type === CollectionType.CollectionType.Struct) {
            size += calculateStructSize(arrayType.data) * arr.size;
        }
        // Array collection
        if (arrayType.type === CollectionType.CollectionType.Array) {
            size += calculateArraySize(arrayType.data) * arr.size;
        }
    }
    return size;
};
/**
 * Returns the internal type of a given variable type.
 * @private
 * @param {VarType} type - The variable type to get the internal type for.
 * @return {VarType} The internal type of the given variable type.
 */
const getInternalType = (type) => {
    const varTypeSize = getVarTypeSize(type);
    // Change the type if necessary
    if (type === VarType.VarType.char)
        type = VarType.VarType.int8_t;
    if (type === VarType.VarType.char16_t)
        type = VarType.VarType.int16_t;
    if (type === VarType.VarType.char32_t)
        type = VarType.VarType.int32_t;
    if (type === VarType.VarType.wchar_t && varTypeSize == 2)
        type = VarType.VarType.int16_t;
    if (type === VarType.VarType.wchar_t && varTypeSize == 4)
        type = VarType.VarType.int32_t;
    if (type === VarType.VarType.unsigned_char)
        type = VarType.VarType.uint8_t;
    if (type === VarType.VarType.short_int)
        type = VarType.VarType.int16_t;
    if (type === VarType.VarType.int)
        type = VarType.VarType.int32_t;
    if (type === VarType.VarType.long_int && varTypeSize == 4)
        type = VarType.VarType.int32_t;
    if (type === VarType.VarType.long_int && varTypeSize == 8)
        type = VarType.VarType.int64_t;
    if (type === VarType.VarType.long_long_int)
        type = VarType.VarType.int64_t;
    if (type === VarType.VarType.unsigned_short_int)
        type = VarType.VarType.uint16_t;
    if (type === VarType.VarType.unsigned_int)
        type = VarType.VarType.uint32_t;
    if (type === VarType.VarType.unsigned_long_int && varTypeSize == 4)
        type = VarType.VarType.uint32_t;
    if (type === VarType.VarType.unsigned_long_int && varTypeSize == 8)
        type = VarType.VarType.uint64_t;
    if (type === VarType.VarType.unsigned_long_long_int)
        type = VarType.VarType.uint64_t;
    if (type === VarType.VarType.bool)
        type = VarType.VarType.int8_t;
    return type;
};

exports.calculateArraySize = calculateArraySize;
exports.calculateStructSize = calculateStructSize;
exports.getInternalType = getInternalType;
exports.getVarTypeSize = getVarTypeSize;
