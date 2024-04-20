import { VarType } from '../enums/VarType'
import { Collection } from './Collection'

export interface ArrayCollection {
  type: VarType | Collection
  size: number
}
