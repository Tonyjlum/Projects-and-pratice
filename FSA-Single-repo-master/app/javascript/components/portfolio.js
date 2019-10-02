import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'

import Navbar from './navbar'
import PortfolioStockDisplay from './portfoliostockdisplay'

class Portfolio extends PureComponent {
  state = {
    stocks: {},
  }


  renderStocks = () => {
    console.log(this.props.user, "render")

    return this.props.user.stocks.map( stock => {
      //fetch each price here, add to state
      //render worth in this componenet
      return <PortfolioStockDisplay stock={stock}/>
    })
  }
  //
  // combineStock = () => {
  //   const stocks = {}
  //   this.props.user.transactions.forEach( stock => {
  //     if (stocks[`${stock.ticker_symbol}`] == undefined){
  //       stocks[`${stock.ticker_symbol}`] = stock.shares
  //     } else {
  //       stocks[`${stock.ticker_symbol}`] += stock.shares
  //     }
  //   })
  //   return stocks
  // }


  render() {

    if (this.props.user.id === 0){
      this.props.history.push("/")
    }
    return (
      <div>
        <div className="standard-size">
          <div id="balance">
            {this.props.user.balance}
            {this.renderStocks()}
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter((Portfolio));
