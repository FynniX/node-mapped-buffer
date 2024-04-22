// Generated from Schema.g4 by ANTLR 4.13.1

import { ParseTreeVisitor } from 'antlr4'

import { SchemaContext } from './SchemaParser'
import { StructContext } from './SchemaParser'
import { PathCommandContext } from './SchemaParser'
import { TypeContext } from './SchemaParser'
import { ArrayContext } from './SchemaParser'
import { DimensionContext } from './SchemaParser'
import { PrimitiveTypeContext } from './SchemaParser'
import { UserTypeContext } from './SchemaParser'

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SchemaParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class SchemaVisitor<Result> extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `SchemaParser.schema`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSchema?: (ctx: SchemaContext) => Result
  /**
   * Visit a parse tree produced by `SchemaParser.struct`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStruct?: (ctx: StructContext) => Result
  /**
   * Visit a parse tree produced by `SchemaParser.pathCommand`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPathCommand?: (ctx: PathCommandContext) => Result
  /**
   * Visit a parse tree produced by `SchemaParser.type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitType?: (ctx: TypeContext) => Result
  /**
   * Visit a parse tree produced by `SchemaParser.array`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArray?: (ctx: ArrayContext) => Result
  /**
   * Visit a parse tree produced by `SchemaParser.dimension`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDimension?: (ctx: DimensionContext) => Result
  /**
   * Visit a parse tree produced by `SchemaParser.primitiveType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrimitiveType?: (ctx: PrimitiveTypeContext) => Result
  /**
   * Visit a parse tree produced by `SchemaParser.userType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUserType?: (ctx: UserTypeContext) => Result
}
