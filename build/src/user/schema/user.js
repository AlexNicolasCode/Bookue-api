"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String
});
exports.User = (0, mongoose_1.model)("bookue-users", UserSchema);
