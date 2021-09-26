"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var apollo_server_1 = require("apollo-server");
var types_1 = require("./types");
var resolvers_1 = require("./resolvers");
mongoose.connect(process.env.URI);
!mongoose.connection ? console.log("Error connecting db") : console.log("Db connected successfully");
var server = new apollo_server_1.ApolloServer({ typeDefs: types_1.typeDefs, resolvers: resolvers_1.resolvers });
server.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
