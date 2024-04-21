#!/usr/bin/env node
'use strict';

exports.CommandType = void 0;
(function (CommandType) {
    CommandType["Build"] = "build";
    CommandType["Generate"] = "generate";
})(exports.CommandType || (exports.CommandType = {}));
