import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'

import Navbar from './navbar'
import PortfolioStockDisplay from './portfoliostockdisplay'
import NewStock from './newStock'

class Portfolio extends PureComponent {
  state = {
    stocks: {},
    total_price: 0
  }

  componentDidMount(){
  if (this.props.user.stocks){
    this.props.user.stocks.map( stock => {
      // fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.ticker_symbol}&apikey=IJUTTBOO2Z9LGHGU`)
      fetch(`https://cloud.iexapis.com/stable/stock/${stock.ticker_symbol}/quote?token=sk_69abc46b0d5346b2999a5d51f1377ea7`)
      .then( response => response.json())
      .then( stockinfo => {
        this.setState({
          total_price: this.state.total_price + (stockinfo.latestPrice * stock.total_shares)
        }, () => console.log(this.state, "the state"))
      })
    })
  }
  }
  updateNewStock = (price) => {
    this.setState({total_price: this.state.total_price + price})
  }


  renderStock = () => {
    return this.props.user.stocks.map( stock => {
      return <PortfolioStockDisplay key={stock.ticker_symbol} stock={stock} />
    })
  }

  render() {
    if (this.props.user.id === 0){
      this.props.history.push("/")
    }
    return (
      <div>
        <div className="standard-size">
          <div id="balance" className="display-flex">
            <div className="float-left">
              Portfolio: ${this.state.total_price.toFixed(2)}
              <br/>
              <br/>
              {this.props.user.stocks && this.renderStock()}
            </div >
            <div className="float-right">
              <NewStock balance={this.props.user.balance} user_id={this.props.user.id}
              updateTransaction={this.props.updateTransaction}
              updateNewStock={this.updateNewStock}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter((Portfolio));
