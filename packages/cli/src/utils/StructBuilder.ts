import { StructCollection } from '../interfaces/StructCollection'
import { VarType } from '../enums/VarType'
import { CollectionType } from '../enums/CollectionType'
import { Collection } from '../interfaces/Collection'

export class StructBuilder {
  private _struct: StructCollection

  constructor(struct?: StructCollection) {
    this._struct = struct ?? {}
  }

  public addVariable(name: string, type: VarType): StructBuilder {
    this._struct[name] = type
    return this
  }

  public addArray(name: string, type: VarType | Collection, size: number): StructBuilder {
    this._struct[name] = { type: CollectionType.Array, data: { type, size } }
    return this
  }

  public addStruct(name: string, struct: StructCollection): StructBuilder {
    this._struct[name] = { type: CollectionType.Struct, data: struct }
    return this
  }

  public build(): StructCollection {
    return this._struct
  }

  static toString(name: string, struct: StructCollection): string {
    return `const ${name} = ${JSON.stringify(struct, null, 2)}`
  }

  static createArray(type: VarType | Collection, size: number): Collection {
    return { type: CollectionType.Array, data: { type, size } }
  }

  static createStruct(struct: StructCollection): Collection {
    return { type: CollectionType.Struct, data: struct }
  }
}
