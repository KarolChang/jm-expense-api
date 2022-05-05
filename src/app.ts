import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, NonEmptyArray } from 'type-graphql'
import express from 'express'
import path from 'path'

async function main() {
  const app = express()
  await createConnection()
  const schema = await buildSchema({
    // resolvers: [
    //   __dirname + '@entity/**/*.query.ts',
    //   __dirname + '@entity/**/*.mutation.ts',
    //   __dirname + '@entity/**/*.fieldResolver.ts'
    // ],
    resolvers: [path.resolve('./src/graphql/entity/**/index.ts')] as NonEmptyArray<string>,
    dateScalarMode: 'isoDate', // 預設是 'isoDate'
    nullableByDefault: true,
    validate: false
  })
  const server = new ApolloServer({ schema })
  await server.start()
  server.applyMiddleware({ app })
  app.listen(4100, () => {
    console.log('Server has started at http://localhost:4100/graphql')
  })
}
main()
