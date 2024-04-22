import { ATN, CharStream, DFA, Lexer } from "antlr4";
export default class SchemaLexer extends Lexer {
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
    static readonly channelNames: string[];
    static readonly literalNames: (string | null)[];
    static readonly symbolicNames: (string | null)[];
    static readonly modeNames: string[];
    static readonly ruleNames: string[];
    constructor(input: CharStream);
    get grammarFileName(): string;
    get literalNames(): (string | null)[];
    get symbolicNames(): (string | null)[];
    get ruleNames(): string[];
    get serializedATN(): number[];
    get channelNames(): string[];
    get modeNames(): string[];
    static readonly _serializedATN: number[];
    private static __ATN;
    static get _ATN(): ATN;
    static DecisionsToDFA: DFA[];
}
