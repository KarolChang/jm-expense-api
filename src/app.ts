import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLRequestContext } from 'apollo-server-types'
import { buildSchema, NonEmptyArray } from 'type-graphql'
import { customAuthChecker } from '@graphql/auth/checker'
import { CustomContext } from '@graphql/auth/customContext'
import { initSchedule } from '@graphql/schedule'
import { nanoid } from 'nanoid'
import { useExpressServer } from 'routing-controllers'
import path from 'path'
import https from 'https'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  console.log('TYPEORM_URL: ', process.env.TYPEORM_URL)
  console.log('NODE_ENV: ', process.env.NODE_ENV)

  const isProd = process.env.NODE_ENV === 'production'
  const app = express()

  const startTime = new Date()

  await createConnection()

  console.log('Step1: DB Success Connection.......')

  useExpressServer(app, {
    controllers: isProd ? [path.resolve('./dist/routings/*.js')] : [path.resolve('./src/routings/*.ts')]
  })

  const schema = await buildSchema({
    resolvers: isProd
      ? ([path.resolve('./dist/graphql/entity/**/index.js')] as NonEmptyArray<string>)
      : ([path.resolve('./src/graphql/entity/**/index.ts')] as NonEmptyArray<string>),
    // ([path.resolve('./dist/graphql/entity/**/index{.js,.ts}')] as NonEmptyArray<string>)
    dateScalarMode: 'isoDate', // 預設是 'isoDate'
    nullableByDefault: true,
    validate: false,
    emitSchemaFile: true,
    authChecker: customAuthChecker
  })
  let server = new ApolloServer({
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

  console.log('Step2: Graphql Success Initialize......')

  await initSchedule()

  console.log('Step3: Schedules Success Initialize......')

  // ssl
  let appServer:any = app
  // if(isProd) {
  //   const privateKey = fs.readFileSync(__dirname + '/ssl/private.key')
  //   const certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt')
  //   const credentials = { key: privateKey, cert: certificate }
  //   appServer = https.createServer(credentials, app)
  // }

  const PORT = process.env.DOCKER_PORT
  appServer.listen(PORT, () => {
    console.log(`Step4: Server has started at http://localhost:${PORT}/graphql`)
    // Launch Time
    const finishTime = new Date()
    const time = finishTime.getTime() - startTime.getTime()
    console.log(`[Launch Time] duration: ${time}ms`)
    console.log(`[Now Time] ${new Date().toLocaleString()}`)   
  })
}
main()
