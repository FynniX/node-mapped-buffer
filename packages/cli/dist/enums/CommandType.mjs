#!/usr/bin/env node
var CommandType;
(function (CommandType) {
    CommandType["Build"] = "build";
    CommandType["Generate"] = "generate";
})(CommandType || (CommandType = {}));

export { CommandType };
