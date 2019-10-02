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
    transactions: []
  }

  setUser = (login) =>{
    console.log(login)
    this.setState({
      id: login.id,
      transactions: login.transactions
    }, () => {console.log(this.state, "after login")})

  }


  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Login setUser={this.setUser}/>}/>
          <Route exact path="/register" render={() => <Register />}/>
          // <Route path="/hello" render={() => <HelloWorld greeting="Friend"/>} />
          <Route exact path="/portfolio" render ={() => <Portfolio />}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App
