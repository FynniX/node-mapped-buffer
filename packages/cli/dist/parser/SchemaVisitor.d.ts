import { ParseTreeVisitor } from 'antlr4';
import { SchemaContext } from "./SchemaParser";
import { StructContext } from "./SchemaParser";
import { PathCommandContext } from "./SchemaParser";
import { TypeContext } from "./SchemaParser";
import { ArrayContext } from "./SchemaParser";
import { DimensionContext } from "./SchemaParser";
import { PrimitiveTypeContext } from "./SchemaParser";
import { UserTypeContext } from "./SchemaParser";
export default class SchemaVisitor<Result> extends ParseTreeVisitor<Result> {
    visitSchema?: (ctx: SchemaContext) => Result;
    visitStruct?: (ctx: StructContext) => Result;
    visitPathCommand?: (ctx: PathCommandContext) => Result;
    visitType?: (ctx: TypeContext) => Result;
    visitArray?: (ctx: ArrayContext) => Result;
    visitDimension?: (ctx: DimensionContext) => Result;
    visitPrimitiveType?: (ctx: PrimitiveTypeContext) => Result;
    visitUserType?: (ctx: UserTypeContext) => Result;
}
