const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const mongoose = require('mongoose')
const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
mongoose.set('strictQuery', false)


require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const start = async () => {//using async so server can start before we listen to port. this allows the function to wait for server to start
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({//using websocketserver (only needed for subscriptions)
    server: httpServer,//with the server we just created
    path: '/',//on main path
  })
  const schema = makeExecutableSchema({ typeDefs, resolvers })//schema
  const serverCleanup = useServer({ schema }, wsServer)//server cleanup using ws-server and our schema

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),//to shut down the server 'gracefully'
    {
      async serverWillStart() {//if server starts, we define its cleanup
        return {
          async drainServer() {//to cleanup server
            await serverCleanup.dispose()
          }
        }
      }
    }]
  })
  await server.start()//wait for start before listening to port
  app.use(
    '/',//use for all pages
    cors(),//needed for express
    express.json(),//needed for express
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
          )
          const currentUser = await User
            .findById(decodedToken.id)
          return { currentUser }
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}
start()