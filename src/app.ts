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

  if (process.env.NODE_ENV === 'production') {
    let config: ConnectionOptions = {
      type: 'mysql',
      synchronize: true,
      logging: false,
      entities: ['dist/graphql/entity/**/*.js'],
      url: process.env.CLEARDB_DATABASE_URL,
      migrations: ['migration/**/js']
    }
    Object.assign(config, {
      // url: process.env.CLEARDB_DATABASE_URL,
      // entities: ['dist/graphql/entity/**/*.js'],
      seeds: ['dist/graphql/seed/*.js']
    })
    await createConnection(config)
  } else {
    await createConnection()
  }

  console.log('======= success connection ========')

  const schema = await buildSchema({
    resolvers:
      process.env.NODE_ENV === 'production'
        ? ([path.resolve('./dist/graphql/entity/**/index.js')] as NonEmptyArray<string>)
        : ([path.resolve('./src/graphql/entity/**/index.ts')] as NonEmptyArray<string>),
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
