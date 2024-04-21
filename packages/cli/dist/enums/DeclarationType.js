#!/usr/bin/env node
'use strict';

exports.DeclarationType = void 0;
(function (DeclarationType) {
    DeclarationType[DeclarationType["Unknown"] = 0] = "Unknown";
    DeclarationType[DeclarationType["Primitive"] = 1] = "Primitive";
    DeclarationType[DeclarationType["User"] = 2] = "User";
})(exports.DeclarationType || (exports.DeclarationType = {}));
