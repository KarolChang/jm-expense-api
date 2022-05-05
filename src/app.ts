import 'reflect-metadata'
import express from 'express'
import { createConnection, ConnectionOptions } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, NonEmptyArray } from 'type-graphql'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  const app = express()

  if (process.env.CLEARDB_DATABASE_URL) {
    let config: ConnectionOptions = {
      type: 'mysql',
      synchronize: false,
      logging: false,
      entities: ['src/graphql/entity/**/*.js']
    }
    Object.assign(config, { url: process.env.CLEARDB_DATABASE_URL })
    await createConnection(config)
  } else {
    await createConnection()
  }

  console.log('======= success connection ========')

  const schema = await buildSchema({
    resolvers: [path.resolve('./src/graphql/entity/**/index.ts')] as NonEmptyArray<string>,
    dateScalarMode: 'isoDate', // 預設是 'isoDate'
    nullableByDefault: true,
    validate: false
  })
  const server = new ApolloServer({ schema })
  await server.start()
  server.applyMiddleware({ app })
  app.listen(process.env.PORT || 4100, () => {
    console.log(`Server has started at http://localhost:${process.env.PORT}/graphql`)
  })
}
main()
