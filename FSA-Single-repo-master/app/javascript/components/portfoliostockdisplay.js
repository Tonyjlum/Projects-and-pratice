import React, { Component } from 'react';

class PortfolioStockDisplay extends Component {
  //fetch for each stock price by ticker "this.props.stock[0]"
  state = {
    stockinfo: null,
    price: 0.00,
    open: 0.00
  }


  componentDidMount(){
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.props.stock.ticker_symbol}&apikey=SI6AQKBYGQE1HV4V`)
    .then( res => res.json())
    .then( stockinfo => {
      if (stockinfo["Note"]){
        window.confirm(`Alphavantage API overload, please try again later for updates. Updates for ${this.props.stock.ticker_symbol} could not be loaded.`)
      }
      // console.log(stockinfo,"fetch")
      this.setState({
        stockinfo: stockinfo,
        price: parseFloat(stockinfo["Global Quote"]["05. price"]).toFixed(2),
        open: parseFloat(stockinfo["Global Quote"]["02. open"]).toFixed(2)
      })
    })
  }

  render() {
    // console.log(this.state, "stock")
    return (
      <div className={`stock-display display-flex ${this.state.price > this.state.open && "green-text"} ${this.state.price < this.state.open && "red-text"}`}>
        {this.state.price > this.state.open && "📈"}
        {this.state.price == this.state.open && "⬜"}
        {this.state.price < this.state.open && "📉"}
        {` ${this.props.stock.ticker_symbol.toUpperCase()} - ${this.props.stock.total_shares} shares @ $${this.state.price}  = $${(this.props.stock.total_shares * this.state.price).toFixed(2)}`}
      </div>
    );
  }

}

export default PortfolioStockDisplay;
