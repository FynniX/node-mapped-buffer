import { ATN, DFA, FailedPredicateException, Parser, ParserRuleContext, TerminalNode, TokenStream } from 'antlr4';
import SchemaListener from "./SchemaListener.js";
import SchemaVisitor from "./SchemaVisitor.js";
export default class SchemaParser extends Parser {
    static readonly T__0 = 1;
    static readonly T__1 = 2;
    static readonly T__2 = 3;
    static readonly T__3 = 4;
    static readonly T__4 = 5;
    static readonly T__5 = 6;
    static readonly T__6 = 7;
    static readonly T__7 = 8;
    static readonly T__8 = 9;
    static readonly T__9 = 10;
    static readonly T__10 = 11;
    static readonly T__11 = 12;
    static readonly T__12 = 13;
    static readonly T__13 = 14;
    static readonly T__14 = 15;
    static readonly T__15 = 16;
    static readonly T__16 = 17;
    static readonly T__17 = 18;
    static readonly T__18 = 19;
    static readonly T__19 = 20;
    static readonly T__20 = 21;
    static readonly T__21 = 22;
    static readonly SEMICOLON = 23;
    static readonly CURVED_BRACKET_OPEN = 24;
    static readonly CURVED_BRACKET_CLOSE = 25;
    static readonly BRACKET_OPEN = 26;
    static readonly BRACKET_CLOSE = 27;
    static readonly DELIMITER = 28;
    static readonly AT = 29;
    static readonly STRING = 30;
    static readonly NAME = 31;
    static readonly NUMBER = 32;
    static readonly NEWLINE = 33;
    static readonly WHITESPACE = 34;
    static readonly EOF: number;
    static readonly RULE_schema = 0;
    static readonly RULE_struct = 1;
    static readonly RULE_pathCommand = 2;
    static readonly RULE_type = 3;
    static readonly RULE_array = 4;
    static readonly RULE_dimension = 5;
    static readonly RULE_primitiveType = 6;
    static readonly RULE_userType = 7;
    static readonly literalNames: (string | null)[];
    static readonly symbolicNames: (string | null)[];
    static readonly ruleNames: string[];
    get grammarFileName(): string;
    get literalNames(): (string | null)[];
    get symbolicNames(): (string | null)[];
    get ruleNames(): string[];
    get serializedATN(): number[];
    protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException;
    constructor(input: TokenStream);
    schema(): SchemaContext;
    struct(): StructContext;
    pathCommand(): PathCommandContext;
    type_(): TypeContext;
    array(): ArrayContext;
    dimension(): DimensionContext;
    primitiveType(): PrimitiveTypeContext;
    userType(): UserTypeContext;
    static readonly _serializedATN: number[];
    private static __ATN;
    static get _ATN(): ATN;
    static DecisionsToDFA: DFA[];
}
export declare class SchemaContext extends ParserRuleContext {
    constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number);
    EOF(): TerminalNode;
    struct_list(): StructContext[];
    struct(i: number): StructContext;
    get ruleIndex(): number;
    enterRule(listener: SchemaListener): void;
    exitRule(listener: SchemaListener): void;
    accept<Result>(visitor: SchemaVisitor<Result>): Result;
}
export declare class StructContext extends ParserRuleContext {
    constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number);
    NAME(): TerminalNode;
    CURVED_BRACKET_OPEN(): TerminalNode;
    CURVED_BRACKET_CLOSE(): TerminalNode;
    pathCommand(): PathCommandContext;
    type__list(): TypeContext[];
    type_(i: number): TypeContext;
    get ruleIndex(): number;
    enterRule(listener: SchemaListener): void;
    exitRule(listener: SchemaListener): void;
    accept<Result>(visitor: SchemaVisitor<Result>): Result;
}
export declare class PathCommandContext extends ParserRuleContext {
    constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number);
    AT(): TerminalNode;
    STRING(): TerminalNode;
    get ruleIndex(): number;
    enterRule(listener: SchemaListener): void;
    exitRule(listener: SchemaListener): void;
    accept<Result>(visitor: SchemaVisitor<Result>): Result;
}
export declare class TypeContext extends ParserRuleContext {
    constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number);
    NAME(): TerminalNode;
    SEMICOLON(): TerminalNode;
    primitiveType_list(): PrimitiveTypeContext[];
    primitiveType(i: number): PrimitiveTypeContext;
    array(): ArrayContext;
    userType(): UserTypeContext;
    get ruleIndex(): number;
    enterRule(listener: SchemaListener): void;
    exitRule(listener: SchemaListener): void;
    accept<Result>(visitor: SchemaVisitor<Result>): Result;
}
export declare class ArrayContext extends ParserRuleContext {
    constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number);
    dimension_list(): DimensionContext[];
    dimension(i: number): DimensionContext;
    get ruleIndex(): number;
    enterRule(listener: SchemaListener): void;
    exitRule(listener: SchemaListener): void;
    accept<Result>(visitor: SchemaVisitor<Result>): Result;
}
export declare class DimensionContext extends ParserRuleContext {
    constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number);
    BRACKET_OPEN(): TerminalNode;
    NUMBER(): TerminalNode;
    BRACKET_CLOSE(): TerminalNode;
    get ruleIndex(): number;
    enterRule(listener: SchemaListener): void;
    exitRule(listener: SchemaListener): void;
    accept<Result>(visitor: SchemaVisitor<Result>): Result;
}
export declare class PrimitiveTypeContext extends ParserRuleContext {
    constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number);
    get ruleIndex(): number;
    enterRule(listener: SchemaListener): void;
    exitRule(listener: SchemaListener): void;
    accept<Result>(visitor: SchemaVisitor<Result>): Result;
}
export declare class UserTypeContext extends ParserRuleContext {
    constructor(parser?: SchemaParser, parent?: ParserRuleContext, invokingState?: number);
    NAME(): TerminalNode;
    get ruleIndex(): number;
    enterRule(listener: SchemaListener): void;
    exitRule(listener: SchemaListener): void;
    accept<Result>(visitor: SchemaVisitor<Result>): Result;
}
