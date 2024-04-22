import { CollectionType } from '../enums/CollectionType'
import { TypescriptType } from '../enums/TypescriptType'
import { VarType } from '../enums/VarType'
import { ArrayCollection } from '../interfaces/ArrayCollection'
import { Collection } from '../interfaces/Collection'
import { StructCollection } from '../interfaces/StructCollection'

export class InterfaceBuilder {
  private readonly _name: string
  private readonly _struct: StructCollection
  private _interface: string = ''

  constructor(name: string, struct: StructCollection) {
    this._name = name
    this._struct = struct
  }

  private readStruct(template: StructCollection): string {
    let struct = '{\n'

    for (const key in template) {
      const varType = template[key]

      // Regular type
      if (typeof varType === 'string') {
        struct += `${key}: ${this.getTypescriptType(varType)};\n`
      }

      // Collection type
      if (typeof varType === 'object') {
        const collection = varType as Collection

        // Struct collection
        if (collection.type === CollectionType.Struct) {
          struct += `${key}: (${this.readStruct(collection.data as StructCollection)});\n`
        }

        // Array collection
        if (collection.type === CollectionType.Array) {
          const type = this.getArrayType(collection.data as ArrayCollection)
          const dimension = this.getArrayDimension(collection.data as ArrayCollection)

          if (typeof type === 'object') {
            struct += `${key}: (${this.readStruct(collection.data as StructCollection)})[];\n`
          }

          if (typeof type === 'string') {
            struct += `${key}: ${this.getTypescriptType(type, true)}${'[]'.repeat(dimension)};\n`
          }
        }
      }
    }

    struct += '}'

    return struct
  }

  private getTypescriptType(type: VarType, isArray: boolean = false): TypescriptType | null {
    // Check weather the type is a bool
    if (type === VarType.bool) return TypescriptType.Boolean

    // Check weather the type is a char array
    if (isArray && type === VarType.char) return TypescriptType.String
    if (isArray && type === VarType.char16_t) return TypescriptType.String
    if (isArray && type === VarType.char32_t) return TypescriptType.String
    if (isArray && type === VarType.wchar_t) return TypescriptType.String

    // All other cases number
    return TypescriptType.Number
  }

  private getArrayType(template: ArrayCollection): VarType | StructCollection {
    // Collection type
    if (typeof template.type === 'object') {
      const collection = template.type as Collection

      // Struct collection
      if (collection.type === CollectionType.Struct) {
        return collection.data as StructCollection
      }

      // Array collection
      if (collection.type === CollectionType.Array) {
        return this.getArrayType(collection.data as ArrayCollection)
      }
    }

    return template.type as VarType
  }

  private getArrayDimension(template: ArrayCollection, dim = 0): number {
    // Collection type
    if (typeof template.type === 'object') {
      const collection = template.type as Collection

      // Array collection
      if (collection.type === CollectionType.Array) {
        return this.getArrayDimension(collection.data as ArrayCollection, dim + 1)
      }
    }

    return dim + 1
  }

  public build(): string {
    // set interface
    this._interface = `export interface I${this._name} ${this.readStruct(this._struct)}\n`
    return this._interface
  }
}
