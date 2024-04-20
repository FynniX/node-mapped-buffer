grammar Schema;

/**
 * Parser Rule
 */

schema: struct+ EOF;

// @PATH "TEST" struct NAME { TYPES } or struct NAME { TYPES }
struct:
	pathCommand? 'struct' NAME CURVED_BRACKET_OPEN type+ CURVED_BRACKET_CLOSE;

pathCommand: AT 'PATH' STRING;

// int test; or int test[2];
type:
	primitiveType+ NAME array? SEMICOLON
	| userType NAME array? SEMICOLON;

// [NUMBER][NUMBER][NUMBER]
array: dimension+;

// [NUMBER]
dimension: BRACKET_OPEN NUMBER BRACKET_CLOSE;

primitiveType:
	'char'
	| 'char16_t'
	| 'char32_t'
	| 'wchar_t'
	| 'unsigned'
	| 'signed'
	| 'short'
	| 'int'
	| 'long'
	| 'int8_t'
	| 'int16_t'
	| 'int32_t'
	| 'int64_t'
	| 'uint8_t'
	| 'uint16_t'
	| 'uint32_t'
	| 'uint64_t'
	| 'float'
	| 'double'
	| 'bool';

userType: NAME;

/**
 * Lexer Rule
 */

SEMICOLON: ';';

CURVED_BRACKET_OPEN: '{';

CURVED_BRACKET_CLOSE: '}';

BRACKET_OPEN: '[';

BRACKET_CLOSE: ']';

DELIMITER: '\'' | '"';

AT: '@';

STRING: DELIMITER .*? DELIMITER;

// A word can be letters [A-Za-z]+
NAME: [A-Za-z]+;

// A number can only be between 0-9+
NUMBER: [0-9]+;

NEWLINE: [\r\n]+ -> skip;
WHITESPACE: ' ' -> skip;