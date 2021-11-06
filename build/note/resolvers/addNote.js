"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.addNote = void 0;
var validadeUser_1 = require("../../user/tools/validadeUser");
var findBook_1 = require("../tools/findBook");
var updateNotes_1 = require("../tools/updateNotes");
var addNote = function (token, bookID, note) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newNotes, book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, validadeUser_1.verifyToken)(token)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, findBook_1.findBook)(bookID, user.email)];
            case 2:
                book = _a.sent();
                if (!(book && book.notes[0] && isValidNote(book.notes, note))) return [3 /*break*/, 6];
                return [4 /*yield*/, setNewNotes(book.notes, note)];
            case 3:
                newNotes = _a.sent();
                return [4 /*yield*/, (0, updateNotes_1.updateNotes)(bookID, newNotes)];
            case 4:
                _a.sent();
                return [4 /*yield*/, isAdded(bookID, user.email, newNotes)];
            case 5: return [2 /*return*/, _a.sent()];
            case 6:
                newNotes = {
                    notes: [
                        { text: note, created_at: Date.now() }
                    ]
                };
                return [4 /*yield*/, (0, updateNotes_1.updateNotes)(bookID, newNotes)];
            case 7:
                _a.sent();
                return [4 /*yield*/, isAdded(bookID, user.email, newNotes)];
            case 8: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addNote = addNote;
var isAdded = function (bookID, email, newNotes) { return __awaiter(void 0, void 0, void 0, function () {
    var book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, findBook_1.findBook)(bookID, email)];
            case 1:
                book = _a.sent();
                return [2 /*return*/, book.notes.length === newNotes.notes.length];
        }
    });
}); };
var isValidNote = function (notes, newNotes) {
    return notes.find(function (note) { return note.text === newNotes; }) ? false : true;
};
var setNewNotes = function (currentNotes, note) {
    return {
        notes: __spreadArray(__spreadArray([], currentNotes, true), [
            {
                text: note,
                created_at: Date.now()
            }
        ], false)
    };
};
