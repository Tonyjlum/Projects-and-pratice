import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import Transaction from './transaction'
import NavBar from './navbar'


class TransactionContainer extends PureComponent {

  renderTransactions= () => {
    return this.props.user.transactions.map( transaction => {
      return <Transaction key={transaction.id} transaction={transaction}/>
    })
  }

  render() {
    if (this.props.user.id === 0) { this.props.history.push("/") }
    console.log(this.props.user)
    return (
      <div className="standard-size">
      <NavBar/>
        <h1>Transaction</h1>

        <div className="overflow">
          {this.renderTransactions()}
        </div>
      </div>
    );
  }

}

export default withRouter(TransactionContainer);
