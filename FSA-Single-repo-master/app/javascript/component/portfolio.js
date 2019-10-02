import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'

class Portfolio extends PureComponent {
  // state = {
  //   balance: 0,
  //   stocks: [],
  //   user_id: 0,
  // }

  //make Component for portfolio stock list
  //make Component for but new stock


  render() {
    console.log(this.props.user, "from prot")
    if (this.props.user.id === 0){
      this.props.history.push("/")
    }
    return (
      <div>
        {this.props.user.balance}
        Hi
      </div>
    );
  }

}

export default withRouter((Portfolio));
