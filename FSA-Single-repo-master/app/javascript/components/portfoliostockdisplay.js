import React, { Component } from 'react';

class PortfolioStockDisplay extends Component {
  //fetch for each stock price by ticker "this.props.stock[0]"


  render() {
    return (
      <div>
        {this.props.stock.ticker_symbol}
        {this.props.stock.total_shares}
        <span> price</span>
      </div>
    );
  }

}

export default PortfolioStockDisplay;
