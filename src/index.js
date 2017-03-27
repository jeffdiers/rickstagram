import React from 'react'
import ReactDOM from 'react-dom'
import ListPage from './components/ListPage'
import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'
import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import 'tachyons'
import './index.css'

const networkInterface = createNetworkInterface({ uri: "https://api.graph.cool/simple/v1/cj0rfdko7dgyq0118yftueyyf" })

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={ListPage}>
        <Route path='create' component={CreatePage} />
        <Route path='post/:id' component={DetailPage} />
      </Route>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)

/* 
* puppies: https://api.graph.cool/simple/v1/cj0l8z1jl6rm80139je4ie27b
* rickstagram:  https://api.graph.cool/simple/v1/cj0rfdko7dgyq0118yftueyyf 
* live Example: https://api.graph.cool/simple/v1/cj0rjxktqd9t401026wmiwwm5
*/
