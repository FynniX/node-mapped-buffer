import { VarType } from '../enums/VarType';
import { Collection } from './Collection';
export interface StructCollection {
    [key: string]: VarType | Collection;
}
