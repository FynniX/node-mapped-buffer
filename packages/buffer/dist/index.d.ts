import { Struct } from './interfaces/Struct';
import { StructCollection } from './interfaces/StructCollection';
/**
 * @class
 * @name MappedBuffer
 * @description A memory mapped buffer.
 * @template Result The interface of the struct.
 */
export declare class MappedBuffer<Result> {
    /**
     * @private
     * @description The addon instance.
     */
    private readonly _addonInstance;
    /**
     * @name _template
     * @description The template of the struct.
     */
    private readonly _template;
    /**
     * @name bufferPath
     * @description The path of the buffer.
     */
    readonly bufferPath: string;
    /**
     * @name bufferSize
     * @description The size of the buffer in bytes.
     */
    readonly bufferSize: number;
    /**
     * @constructor
     * @name MappedBuffer
     * @param bufferPath The path of the buffer.
     * @param struct The struct of the buffer.
     */
    constructor(bufferPath: string, struct: StructCollection);
    /**
     * @name create
     * @description Creates the buffer.
     */
    create(): void;
    /**
     * @name open
     * @description Opens the buffer.
     */
    open(): void;
    /**
     * @name read
     * @description Reads the buffer.
     * @returns The struct from the buffer.
     */
    read(): Result | null;
    /**
     * @name write
     * @description Writes to the buffer.
     * @param data The struct to write to the buffer.
     */
    write(data: Struct): void;
    /**
     * @name close
     * @description Closes the buffer.
     */
    close(): void;
}
