import { MappedBuffer as IMappedBuffer } from './interfaces/MappedBuffer'
import { Struct } from './interfaces/Struct'
import { StructCollection } from './interfaces/StructCollection'
import { calculateStructSize } from './utils'
import { BufferReader } from './utils/BufferReader'
import { BufferWriter } from './utils/BufferWriter'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require('../build/Release/mapped-buffer')

/**
 * @class
 * @name MappedBuffer
 * @description A memory mapped buffer.
 * @template Result The interface of the struct.
 */
export class MappedBuffer<Result> {
  /**
   * @private
   * @description The addon instance.
   */
  private readonly _addonInstance: IMappedBuffer

  /**
   * @name _template
   * @description The template of the struct.
   */
  private readonly _template: StructCollection

  /**
   * @name bufferPath
   * @description The path of the buffer.
   */
  public readonly bufferPath: string

  /**
   * @name bufferSize
   * @description The size of the buffer in bytes.
   */
  public readonly bufferSize: number = 0

  /**
   * @constructor
   * @name MappedBuffer
   * @param bufferPath The path of the buffer.
   * @param struct The struct of the buffer.
   */
  constructor(bufferPath: string, struct: StructCollection) {
    this._template = struct
    this.bufferPath = bufferPath
    this.bufferSize = calculateStructSize(this._template)
    this._addonInstance = new addon.MappedBuffer(this.bufferPath, this.bufferSize)
  }

  /**
   * @name create
   * @description Creates the buffer.
   */
  public create() {
    this._addonInstance.create()
  }

  /**
   * @name open
   * @description Opens the buffer.
   */
  public open() {
    this._addonInstance.open()
  }

  /**
   * @name read
   * @description Reads the buffer.
   * @returns The struct from the buffer.
   */
  public read(): Result | null {
    const buffer = this._addonInstance.read()
    if (!buffer) return null
    const reader = new BufferReader(buffer)
    return reader.readStruct(this._template) as Result
  }

  /**
   * @name write
   * @description Writes to the buffer.
   * @param data The struct to write to the buffer.
   */
  public write(data: Struct) {
    const writer = new BufferWriter()
    writer.writeStruct(this._template, data)
    this._addonInstance.write(writer.getBuffer())
  }

  /**
   * @name close
   * @description Closes the buffer.
   */
  public close() {
    this._addonInstance.close()
  }
}
