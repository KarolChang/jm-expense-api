"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function main() {
    const app = (0, express_1.default)();
    const connect = await (0, typeorm_1.createConnection)();
    console.log('[connect]', connect);
    // if (process.env.NODE_ENV === 'production') {
    // let config: ConnectionOptions = {
    //   type: 'mysql',
    //   synchronize: true,
    //   logging: true,
    //   entities: ['dist/graphql/entity/**/*.js'],
    //   url: process.env.CLEARDB_DATABASE_URL
    // }
    // Object.assign(config, {
    //   url: process.env.CLEARDB_DATABASE_URL,
    //   seeds: ['dist/graphql/seed/*.js']
    // })
    //   await createConnection()
    // } else {
    //   await createConnection()
    // }
    console.log('======= success connection ========');
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: process.env.NODE_ENV === 'production'
            ? [path_1.default.resolve('./dist/graphql/entity/**/index.{js, ts}')]
            : [path_1.default.resolve('./src/graphql/entity/**/index.ts')],
        // ([path.resolve('./dist/graphql/entity/**/index{.js,.ts}')] as NonEmptyArray<string>)
        dateScalarMode: 'isoDate',
        nullableByDefault: true,
        validate: false
    });
    const server = new apollo_server_express_1.ApolloServer({ schema });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(process.env.PORT || 4100, () => {
        console.log(`Server has started at http://localhost:${process.env.PORT}/graphql`);
    });
}
main();
