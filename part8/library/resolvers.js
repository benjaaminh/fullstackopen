const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (args.author) {//allbooks with author parameter
          return Book.find({ author: args.author }).populate('author')//find books with given author
        } else if (args.genre) {//allbooks with genre parameter
          return Book.find({ genres: args.genre }).populate('author')//filters by books whose genre array includes given genre
        } else {
          return Book.find({}).populate('author')//remember to populate, this fixed loading data problem
        }
  
      },
      allAuthors: async () => {
        console.log('Author.find')
        return Author.find({}).populate('books')//remember to populate so authors book objects are loaded
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Author: {
      bookCount: async (root) => {//custom resolver, to calculate bookcount
        const count = await Book.find({ author: root.id })//find books by author id and count documents
        const length = count.length
        console.log("book.find")
        return length//remember to return the value, this fixed non nullable problem
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
          try {
            author = new Author({ name: args.author })
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
        }
        const book = new Book({ ...args, author })//create new book with author we just created
        try {
          const savedBook = await book.save()
          pubsub.publish('BOOK_ADDED',({bookAdded:book}))

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
  
    },
    Subscription:{
        bookAdded:{
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
  }
  module.exports=resolvers