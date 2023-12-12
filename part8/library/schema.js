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
  type Subscription{
    bookAdded : Book!
  }
`
module.exports =typeDefs