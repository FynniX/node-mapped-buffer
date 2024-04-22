import { StructCollection } from '../interfaces/StructCollection'
export declare class InterfaceBuilder {
  private readonly _name
  private readonly _struct
  private _interface
  constructor(name: string, struct: StructCollection)
  private readStruct
  private getTypescriptType
  private getArrayType
  private getArrayDimension
  build(): string
}
