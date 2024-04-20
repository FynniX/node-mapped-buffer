import { ParseTreeListener } from "antlr4";
import { SchemaContext } from "./SchemaParser";
import { StructContext } from "./SchemaParser";
import { PathCommandContext } from "./SchemaParser";
import { TypeContext } from "./SchemaParser";
import { ArrayContext } from "./SchemaParser";
import { DimensionContext } from "./SchemaParser";
import { PrimitiveTypeContext } from "./SchemaParser";
import { UserTypeContext } from "./SchemaParser";
export default class SchemaListener extends ParseTreeListener {
    enterSchema?: (ctx: SchemaContext) => void;
    exitSchema?: (ctx: SchemaContext) => void;
    enterStruct?: (ctx: StructContext) => void;
    exitStruct?: (ctx: StructContext) => void;
    enterPathCommand?: (ctx: PathCommandContext) => void;
    exitPathCommand?: (ctx: PathCommandContext) => void;
    enterType?: (ctx: TypeContext) => void;
    exitType?: (ctx: TypeContext) => void;
    enterArray?: (ctx: ArrayContext) => void;
    exitArray?: (ctx: ArrayContext) => void;
    enterDimension?: (ctx: DimensionContext) => void;
    exitDimension?: (ctx: DimensionContext) => void;
    enterPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
    exitPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
    enterUserType?: (ctx: UserTypeContext) => void;
    exitUserType?: (ctx: UserTypeContext) => void;
}
