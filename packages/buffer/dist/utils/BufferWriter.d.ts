/// <reference types="node" />
import { Endian } from '../enums/Endian';
import { VarType } from '../enums/VarType';
import { ArrayCollection } from '../interfaces/ArrayCollection';
import { Struct } from '../interfaces/Struct';
import { StructCollection } from '../interfaces/StructCollection';
/**
 * @class
 * @name BufferWriter
 * @description A buffer writer.
 */
export declare class BufferWriter {
    /**
     * @private
     * @name _buffer
     * @description The buffer.
     */
    private _buffer;
    /**
     * @private
     * @name _endian
     * @description The endianness.
     */
    private readonly _endian;
    /**
     * @constructor
     * @name BufferWriter
     * @param {Endian} [endian=Endian.Little] - The endianness.
     */
    constructor(endian?: Endian);
    /**
     * Writes a number to the buffer based on the specified type.
     *
     * @param {VarType} type - The type of the number.
     * @param {number} value - The value to write.
     * @return {void} This function does not return anything.
     */
    writeNumber(type: VarType, value: number): void;
    /**
     * Writes a boolean value to the buffer based on the specified type.
     *
     * @param {VarType} type - The type of the boolean value.
     * @param {boolean} value - The boolean value to write.
     * @return {void} This function does not return anything.
     */
    writeBool(type: VarType, value: boolean): void;
    /**
     * Writes an array to the buffer based on the given template and value.
     *
     * @param {ArrayCollection} template - The template of the array to write.
     * @param {unknown[]} value - The array to write.
     * @return {void} This function does not return anything.
     */
    writeArray(template: ArrayCollection, value: unknown[]): void;
    /**
     * A description of the entire function.
     *
     * @param {StructCollection} template - The template of the struct to write.
     * @param {Struct} value - The struct value to write.
     * @return {void} This function does not return anything.
     */
    writeStruct(template: StructCollection, value: Struct): void;
    /**
     * A description of the entire function.
     *
     * @return {Buffer} description of return value
     */
    getBuffer(): Buffer;
}
