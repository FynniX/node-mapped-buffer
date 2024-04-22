// Generated from Schema.g4 by ANTLR 4.13.1

import { ParseTreeListener } from 'antlr4'

import { SchemaContext } from './SchemaParser'
import { StructContext } from './SchemaParser'
import { PathCommandContext } from './SchemaParser'
import { TypeContext } from './SchemaParser'
import { ArrayContext } from './SchemaParser'
import { DimensionContext } from './SchemaParser'
import { PrimitiveTypeContext } from './SchemaParser'
import { UserTypeContext } from './SchemaParser'

/**
 * This interface defines a complete listener for a parse tree produced by
 * `SchemaParser`.
 */
export default class SchemaListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `SchemaParser.schema`.
   * @param ctx the parse tree
   */
  enterSchema?: (ctx: SchemaContext) => void
  /**
   * Exit a parse tree produced by `SchemaParser.schema`.
   * @param ctx the parse tree
   */
  exitSchema?: (ctx: SchemaContext) => void
  /**
   * Enter a parse tree produced by `SchemaParser.struct`.
   * @param ctx the parse tree
   */
  enterStruct?: (ctx: StructContext) => void
  /**
   * Exit a parse tree produced by `SchemaParser.struct`.
   * @param ctx the parse tree
   */
  exitStruct?: (ctx: StructContext) => void
  /**
   * Enter a parse tree produced by `SchemaParser.pathCommand`.
   * @param ctx the parse tree
   */
  enterPathCommand?: (ctx: PathCommandContext) => void
  /**
   * Exit a parse tree produced by `SchemaParser.pathCommand`.
   * @param ctx the parse tree
   */
  exitPathCommand?: (ctx: PathCommandContext) => void
  /**
   * Enter a parse tree produced by `SchemaParser.type`.
   * @param ctx the parse tree
   */
  enterType?: (ctx: TypeContext) => void
  /**
   * Exit a parse tree produced by `SchemaParser.type`.
   * @param ctx the parse tree
   */
  exitType?: (ctx: TypeContext) => void
  /**
   * Enter a parse tree produced by `SchemaParser.array`.
   * @param ctx the parse tree
   */
  enterArray?: (ctx: ArrayContext) => void
  /**
   * Exit a parse tree produced by `SchemaParser.array`.
   * @param ctx the parse tree
   */
  exitArray?: (ctx: ArrayContext) => void
  /**
   * Enter a parse tree produced by `SchemaParser.dimension`.
   * @param ctx the parse tree
   */
  enterDimension?: (ctx: DimensionContext) => void
  /**
   * Exit a parse tree produced by `SchemaParser.dimension`.
   * @param ctx the parse tree
   */
  exitDimension?: (ctx: DimensionContext) => void
  /**
   * Enter a parse tree produced by `SchemaParser.primitiveType`.
   * @param ctx the parse tree
   */
  enterPrimitiveType?: (ctx: PrimitiveTypeContext) => void
  /**
   * Exit a parse tree produced by `SchemaParser.primitiveType`.
   * @param ctx the parse tree
   */
  exitPrimitiveType?: (ctx: PrimitiveTypeContext) => void
  /**
   * Enter a parse tree produced by `SchemaParser.userType`.
   * @param ctx the parse tree
   */
  enterUserType?: (ctx: UserTypeContext) => void
  /**
   * Exit a parse tree produced by `SchemaParser.userType`.
   * @param ctx the parse tree
   */
  exitUserType?: (ctx: UserTypeContext) => void
}
