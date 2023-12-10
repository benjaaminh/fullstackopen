import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name,
    born,
    bookCount,
    id
  }
}
`//changed all_books to return author object with name instead of just string
export const ALL_BOOKS = gql`
query{
    allBooks {
        title,
        author {
          name
          id
          born
          bookCount
        }
        published,
        genres,
        id
    }
}
`
export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres:[String!]!) {
    addBook(
        title:$title,
        author:$author,
        published:$published,
        genres:$genres
    ) {
        title
        author{
          name
          id
          born
          bookCount
        }
        published
        genres
        id
    }
}
`
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

//i have chosen to render username, favoriteGenre and id
export const USER = gql`
query{
  me {
      username
      favoriteGenre
      id
  }
}
`