import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})
const wsLink = new GraphQLWsLink(//web socket link- for subscriptions to client
  createClient({ url: 'ws://localhost:4000' })
)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})
const splitLink = split(//split both links to use them both in apolloclient
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)


const client = new ApolloClient({
    link: splitLink, //remember to run server!!, node index.js in abolloserver directory
    cache: new InMemoryCache(),
  })



ReactDOM.createRoot(document.getElementById('root')).render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>)