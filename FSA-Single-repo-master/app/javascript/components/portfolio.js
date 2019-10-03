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
    this.props.user.stocks.map( stock => {
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.ticker_symbol}&apikey=IJUTTBOO2Z9LGHGU`)
      .then( response => response.json())
      .then( stockinfo => {
        // console.log(stockinfo["Global Quote"]["05. price"] * stock.total_shares)
        this.setState({
          total_price: this.state.total_price + (stockinfo["Global Quote"]["05. price"] * stock.total_shares)
        })
      })
    })
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
              {this.renderStock()}
            </div >
            <div className="float-right">
              <NewStock balance={this.props.user.balance}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter((Portfolio));
