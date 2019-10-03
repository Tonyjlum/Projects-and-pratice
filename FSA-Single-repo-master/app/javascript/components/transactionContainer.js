import React, { PureComponent } from 'react';
import Transaction from './transaction'
class TransactionContainer extends PureComponent {

  renderTransactions= () => {
    return this.props.user.transactions.map( transaction => {
      return <Transaction key={transaction.id} transaction={transaction}/>
    })
  }

  render() {
    console.log(this.props.user)
    return (
      <div className="standard-size">
        <h1>Transaction</h1>
        <div className="overflow">
          {this.renderTransactions()}
        </div>
      </div>
    );
  }

}

export default TransactionContainer;
