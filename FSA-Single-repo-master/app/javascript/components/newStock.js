import React, { Component } from 'react';

class NewStock extends Component {

  state= {
    ticker_symbol: "",
    quantity: 0,
    price: 0,
    balance: this.props.balance,
    user_id: this.props.user_id
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://cloud.iexapis.com/stable/stock/${this.state.ticker_symbol}/quote?token=sk_69abc46b0d5346b2999a5d51f1377ea7`)
    .then( response => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .then(stockinfo => {
      const stock_price = stockinfo.latestPrice
      const total_cost = stock_price * this.state.quantity
      this.props.updateNewStock(total_cost)
      if (total_cost > this.state.balance){
        window.confirm(`You do not have enought to purchase ${this.state.quantity} shares of ${this.state.ticker_symbol}. Please lower your quantity.`)
      } else {
        fetch("http://localhost:3000/v1/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            user_id: this.state.user_id,
            stock_price: stock_price,
            shares: Math.floor(this.state.quantity),
            ticker_symbol: this.state.ticker_symbol.toUpperCase()
          })
        })
        .then( resp => resp.json())
        .then( tra => {
          this.props.updateTransaction({ticker_symbol: tra.transaction.ticker_symbol, shares: tra.transaction.shares }, total_cost)
        })
        .then( xyz => {
          this.setState({
            ticker_symbol: "",
            quantity: 0,
            price: 0,
            balance: this.state.balance - total_cost
          })
        })
      }
    })
    .catch( err => {
        window.alert(`${this.state.ticker_symbol} is an invalid ticker symbol. Please try again.`)

    })
  }

  render() {
    return (
      <div>
        {`Cash - $${this.state.balance && this.state.balance.toFixed(2)}`}
        <form
          className= "login-form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}>
          <input
            className="form-input"
            id="ticker_symbol"
            placeholder="Ticker"
            value={this.state.ticker_symbol}
            required/>
          <br/>
          <input
            className="form-input"
            id="quantity"
            placeholder="quantity"
            type="number"
            step="1"
            min="1"
            value={this.state.quantity}
            required/>
            <input
              className="button"
              type="submit"
              value="Buy"/>
        </form>
      </div>
    );
  }

}

export default NewStock;
