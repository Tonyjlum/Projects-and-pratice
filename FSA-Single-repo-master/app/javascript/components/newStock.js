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
    console.log("from buy")
    // this.setState({
    //   ticker_symbol: "",
    //   quantity: 0,
    //   price: 0,
    //   balance: this.props.balance
    // })
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.ticker_symbol}&apikey=IJUTTBOO2Z9LGHGU`)
    .then( response => response.json())
    .then(stockinfo => {

      //***return error if stock not found***


      console.log(stockinfo);
      const stock_price = stockinfo["Global Quote"]["05. price"]
      const total_cost = stock_price * this.state.quantity

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
            shares: this.state.quantity,
            ticker_symbol: this.state.ticker_symbol.toUpperCase()
          })
        })
      }


    })
  }



  render() {
    return (
      <div>
        {`Cash - ${this.state.balance}`}
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
