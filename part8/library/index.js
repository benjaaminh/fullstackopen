const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const User = require('./models/user'
)
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')
const person = require('../../examples/part8/abolloServer/models/person')
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


const typeDefs = `
type Book{
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
}
type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  

type Author{
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    login(
        username: String!
        password: String!
      ): Token

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
        name: String!
        born: Int!
    ): Author

    createUser(
        username: String!
        favoriteGenre: String!
      ): User
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {//allbooks with author parameter
        return Book.find({ author: args.author }).populate('author')//find books with given author
      } else if (args.genre) {//allbooks with genre parameter
        return Book.find({ genre: { $in: args.genre } }).populate('author')//filters by books whose genre array includes given genre
      } else {
        return Book.find({}).populate('author')//remember to populate, this fixed loading data problem
      }

    },
    allAuthors: async () => {
      return Author.find({}).populate('books')//remember to populate so authors book objects are loaded
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {//custom resolver, to calculate bookcount
      const count = await Book.find({ author: root.id }).countDocuments()//find books by author id and count documents
      return count//remember to return the value, this fixed non nullable problem
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      let author = await Author.findOne({ name: args.author })//search if author exists
      if (!author) {//if not, create new author with given args
        author = new Author({ name: args.author })
        try {
          await author.save(); // Save the new author
        } catch (error) {
          throw new GraphQLError('Creating the author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
        await author.save()//save author
      }
      const book = new Book({ ...args, author: author.id })//create new book with author id
      try {
        const savedBook = await book.save()
        return savedBook

      }
      catch (error) {
        throw new GraphQLError('Creating the book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser//check for user auth
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name })//find the author from args, check that args is args.name and not args.author!!
      if (!author) {
        return null
      }

      author.born = args.born//change author born
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Editing birth year failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })//create user with input arguments

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }//returns token value
    },

  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})