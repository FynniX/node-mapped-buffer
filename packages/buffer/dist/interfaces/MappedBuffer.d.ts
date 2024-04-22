/// <reference types="node" />
export interface MappedBuffer {
  create(): void
  open(): void
  read(): Buffer | undefined
  write(buffer: Buffer): void
  close(): void
}
