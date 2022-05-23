import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLRequestContext } from 'apollo-server-types'
import { buildSchema, NonEmptyArray } from 'type-graphql'
import { customAuthChecker } from '@graphql/auth/checker'
import { CustomContext } from '@graphql/auth/customContext'
import path from 'path'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
dotenv.config()

async function main() {
  const app = express()

  const startTime = new Date()

  await createConnection()

  console.log('======= db success connection ========')

  const schema = await buildSchema({
    resolvers:
      process.env.NODE_ENV === 'production'
        ? ([path.resolve('./dist/graphql/entity/**/index.{js, ts}')] as NonEmptyArray<string>)
        : ([path.resolve('./src/graphql/entity/**/index.ts')] as NonEmptyArray<string>),
    // ([path.resolve('./dist/graphql/entity/**/index{.js,.ts}')] as NonEmptyArray<string>)
    dateScalarMode: 'isoDate', // 預設是 'isoDate'
    nullableByDefault: true,
    validate: false,
    emitSchemaFile: true,
    authChecker: customAuthChecker
  })
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context: CustomContext = {
        uuid: nanoid(),
        headers: req.headers,
        user: undefined,
        info: undefined
      }
      return context
    },
    plugins: [
      {
        async requestDidStart() {
          return {
            async willSendResponse(requestContext: GraphQLRequestContext) {
              if (requestContext.errors) {
                console.log('[ERROR-plugins]', requestContext.errors)
                // throw requestContext.errors
              }
            }
          }
        }
      }
    ]
  })
  await server.start()
  server.applyMiddleware({ app })
  app.listen(process.env.PORT || 4100, () => {
    console.log(`Server has started at http://localhost:${process.env.PORT}/graphql`)
    // Launch Time
    const finishTime = new Date()
    const time = finishTime.getTime() - startTime.getTime()
    console.log(`[Launch Time] duration: ${time}ms`)
  })
}
main()
