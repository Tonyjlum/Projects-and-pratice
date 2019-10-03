import React, { Component } from 'react';

class NewStock extends Component {

  state= {
    ticker_symbol: "",
    quantity: 0,
    price: 0,
    balance: this.props.balance
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
      const total_cost = stockinfo["Global Quote"]["05. price"] * this.state.quantity
      console.log(stockinfo, "stockinfo")
      console.log(total_cost, "total_cost");
      if (total_cost > this.state.balance){
        window.confirm(`You do not have enought to purchase ${this.state.quantity} shares of ${this.state.ticker_symbol}. Please lower your quantity.`)
      } else {
        window.confirm("you got it boss")
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
