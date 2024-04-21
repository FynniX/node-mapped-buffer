import { calculateStructSize } from './utils/index.mjs';
import { BufferReader } from './utils/BufferReader.mjs';
import { BufferWriter } from './utils/BufferWriter.mjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require('../build/Release/mapped-buffer');
/**
 * @class
 * @name MappedBuffer
 * @description A memory mapped buffer.
 * @template Result The interface of the struct.
 */
class MappedBuffer {
    /**
     * @constructor
     * @name MappedBuffer
     * @param bufferPath The path of the buffer.
     * @param struct The struct of the buffer.
     */
    constructor(bufferPath, struct) {
        /**
         * @name bufferSize
         * @description The size of the buffer in bytes.
         */
        this.bufferSize = 0;
        this._template = struct;
        this.bufferPath = bufferPath;
        this.bufferSize = calculateStructSize(this._template);
        this._addonInstance = new addon.MappedBuffer(this.bufferPath, this.bufferSize);
    }
    /**
     * @name create
     * @description Creates the buffer.
     */
    create() {
        this._addonInstance.create();
    }
    /**
     * @name open
     * @description Opens the buffer.
     */
    open() {
        this._addonInstance.open();
    }
    /**
     * @name read
     * @description Reads the buffer.
     * @returns The struct from the buffer.
     */
    read() {
        const buffer = this._addonInstance.read();
        if (!buffer)
            return null;
        const reader = new BufferReader(buffer);
        return reader.readStruct(this._template);
    }
    /**
     * @name write
     * @description Writes to the buffer.
     * @param data The struct to write to the buffer.
     */
    write(data) {
        const writer = new BufferWriter();
        writer.writeStruct(this._template, data);
        this._addonInstance.write(writer.getBuffer());
    }
    /**
     * @name close
     * @description Closes the buffer.
     */
    close() {
        this._addonInstance.close();
    }
}

export { MappedBuffer };
