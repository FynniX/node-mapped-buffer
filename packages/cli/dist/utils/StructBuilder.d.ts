import { StructCollection } from '../interfaces/StructCollection'
import { VarType } from '../enums/VarType'
import { Collection } from '../interfaces/Collection'
export declare class StructBuilder {
  private _struct
  constructor(struct?: StructCollection)
  addVariable(name: string, type: VarType): StructBuilder
  addArray(name: string, type: VarType | Collection, size: number): StructBuilder
  addStruct(name: string, struct: StructCollection): StructBuilder
  build(): StructCollection
  static toString(name: string, struct: StructCollection): string
  static createArray(type: VarType | Collection, size: number): Collection
  static createStruct(struct: StructCollection): Collection
}
