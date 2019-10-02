import React from "react"
import PropTypes from "prop-types"
import '../app.css';
// import { Provider } from "react-redux"

import {BrowserRouter, Switch, Route} from "react-router-dom"

import HelloWorld from './HelloWorld.js'
import Login from './login.js'
import Register from './register'
import Portfolio from './portfolio'


class App extends React.Component {
  state = {
    id: 0,
    user: null,
    budget: 0,
    transactions: []
  }

  setUser = (login) =>{
    this.setState({
      id: login.user.id,
      balance: login.user.balance,
      user: login.user.name,
      transactions: login.user.transactions
    })

  }


  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Login setUser={this.setUser}/>}/>
          <Route exact path="/register" render={() => <Register />}/>
          <Route exact path="/portfolio" render ={() => <Portfolio user={this.state}/>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App
