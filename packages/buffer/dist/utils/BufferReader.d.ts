/// <reference types="node" />
import { Endian } from '../enums/Endian'
import { VarType } from '../enums/VarType'
import { ArrayCollection } from '../interfaces/ArrayCollection'
import { Struct } from '../interfaces/Struct'
import { StructCollection } from '../interfaces/StructCollection'
/**
 * @class
 * @name BufferReader
 * @description A buffer reader.
 */
export declare class BufferReader {
  /**
   * @private
   * @name _buffer
   * @description The buffer.
   */
  private _buffer
  /**
   * @private
   * @name _endian
   * @description The endianness.
   */
  private readonly _endian
  /**
   * @constructor
   * @name BufferReader
   * @param {Buffer} buffer - The buffer.
   * @param {Endian} [endian=Endian.Little] - The endianness.
   */
  constructor(buffer: Buffer, endian?: Endian)
  /**
   * Reads a number value from the buffer based on the given variable type.
   *
   * @param {VarType} type - The variable type to read the number value from.
   * @return {number | null} The read number value or null if the buffer does not have enough bytes.
   */
  readNumber(type: VarType): number | null
  /**
   * Reads a boolean value from the buffer based on the given variable type.
   *
   * @param {VarType} type - The variable type to read the boolean value from.
   * @return {boolean | null} The read boolean value or null if the buffer does not have enough bytes.
   */
  readBool(type: VarType): boolean | null
  /**
   * Reads an array from a template and returns it.
   *
   * @param {ArrayCollection} template - The template of the array to read.
   * @return {unknown[]} The read array.
   */
  readArray(template: ArrayCollection): unknown[]
  /**
   * Reads a struct from a template and returns it.
   *
   * @param {StructCollection} template - The template of the struct to read.
   * @return {Struct | null} The read struct or null if the template is invalid.
   */
  readStruct(template: StructCollection): Struct | null
}
