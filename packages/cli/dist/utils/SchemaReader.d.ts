import { StructCollection } from '../interfaces/StructCollection'
interface StructResult {
  path?: string
  template: StructCollection
}
export declare class SchemaReader {
  private structs
  private visitSchema
  private visitStruct
  private visitType
  private getDeclarationType
  private getArrayLength
  private getVarType
  getStructs(): Map<string, StructResult>
  static read(path: string): Map<string, StructResult>
}
export {}
