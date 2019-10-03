import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Navbar extends Component {

  handleClick= (e) => {
    this.props.history.push(`/${e.target.id}`)
  }

  render() {
    return (
      <div id="navbar">
        <button className="button right-buffer" onClick={this.handleClick} id="portfolio">Protfolio</button>
        <button className="button right-buffer" onClick={this.handleClick} id="transactions">Transactions</button>
        <button className="button right-buffer" onClick={this.handleClick} id="">Logout</button>
      </div>
    );
  }

}

export default withRouter((Navbar));
