import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:4000', //remember to run server!!, node index.js in abolloserver directory
    cache: new InMemoryCache(),
  })


ReactDOM.createRoot(document.getElementById('root')).render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>)