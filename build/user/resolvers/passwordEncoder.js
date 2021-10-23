"use strict";
exports.__esModule = true;
exports.hashPassword = void 0;
var crypto_1 = require("crypto");
var hashPassword = function (password) {
    return (0, crypto_1.createHash)('sha256').update(password).digest('hex');
};
exports.hashPassword = hashPassword;
