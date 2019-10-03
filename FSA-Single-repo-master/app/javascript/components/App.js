import React from "react"
import PropTypes from "prop-types"
import '../app.css';
// import { Provider } from "react-redux"

import {BrowserRouter, Switch, Route} from "react-router-dom"

import Login from './login.js'
import Register from './register'
import Portfolio from './portfolio'
import TransactionContainer from './transactionContainer'


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
      transactions: login.user.transactions,
      stocks: login.user.stocks
    })
  }



  updateTransaction = (transaction, budget, total_trans) => {
    console.log(total_trans, "at update", this.state.transactions);
    if (this.state.stocks.map( s => s.ticker_symbol).includes(transaction.ticker_symbol)){
      const updatedStock= this.state.stocks.map( stock => {
        if (stock.ticker_symbol == transaction.ticker_symbol){
          return {ticker_symbol: stock.ticker_symbol, total_shares: stock.total_shares + transaction.shares}
        } else {
          return stock
        }
      })
      this.setState({
        stocks: updatedStock
      })
    } else {
      this.setState({
        stocks: [...this.state.stocks, {ticker_symbol: transaction.ticker_symbol, total_shares: transaction.shares}]
      })
    }

    this.setState({
      budget: this.state.balance - budget.toFixed(2),
      // transactions: [...this.state.transactions, total_trans]
    })
  }



  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Login setUser={this.setUser}/>} />

          <Route exact path="/register" render={() => <Register />}/>

          <Route exact path="/portfolio" render ={() => <Portfolio user={this.state} updateTransaction = {this.updateTransaction}/>}/>
          <Route eact path="/transactions" render={() => <TransactionContainer user={this.state}/>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App
