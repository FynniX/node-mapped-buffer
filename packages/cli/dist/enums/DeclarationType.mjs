#!/usr/bin/env node
var DeclarationType;
(function (DeclarationType) {
    DeclarationType[DeclarationType["Unknown"] = 0] = "Unknown";
    DeclarationType[DeclarationType["Primitive"] = 1] = "Primitive";
    DeclarationType[DeclarationType["User"] = 2] = "User";
})(DeclarationType || (DeclarationType = {}));

export { DeclarationType };
