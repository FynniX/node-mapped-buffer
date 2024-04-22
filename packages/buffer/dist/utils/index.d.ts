import { ArrayCollection } from '../interfaces/ArrayCollection';
import { StructCollection } from '../interfaces/StructCollection';
import { VarType } from '../enums/VarType';
/**
 * Returns the size of the given variable type.
 *
 * @param {VarType} type - The variable type to get the size of.
 * @return {number | undefined} The size of the variable type, or undefined if the type is not recognized.
 */
export declare const getVarTypeSize: (type: VarType) => number | undefined;
/**
 * Calculates the size of a struct based on the given struct collection.
 *
 * @param {StructCollection} struct - The struct collection to calculate the size of.
 * @return {number} The size of the struct.
 */
export declare const calculateStructSize: (struct: StructCollection) => number;
/**
 * Calculates the size of an array based on the given array collection.
 *
 * @param {ArrayCollection} arr - The array collection to calculate the size of.
 * @return {number} The size of the array.
 */
export declare const calculateArraySize: (arr: ArrayCollection) => number;
/**
 * Returns the internal type of a given variable type.
 * @private
 * @param {VarType} type - The variable type to get the internal type for.
 * @return {VarType} The internal type of the given variable type.
 */
export declare const getInternalType: (type: VarType) => VarType;
