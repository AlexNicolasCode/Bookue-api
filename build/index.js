"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var apollo_server_1 = require("apollo-server");
var types_1 = require("./types");
var resolver_1 = require("./resolver");
dotenv.config();
mongoose.connect(process.env.URI);
!mongoose.connection ? console.log("Error connecting db") : console.log("Db connected successfully");
var server = new apollo_server_1.ApolloServer({
    typeDefs: types_1.typeDefs,
    resolvers: resolver_1.resolvers,
    context: function (_a) {
        var req = _a.req;
        var token = req.headers.authorization || '';
        return { token: token };
    }
});
server.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
