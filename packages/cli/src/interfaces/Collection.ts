import { CollectionType } from '../enums/CollectionType'
import { ArrayCollection } from './ArrayCollection'
import { StructCollection } from './StructCollection'

export interface Collection {
  type: CollectionType
  data?: StructCollection | ArrayCollection
}
