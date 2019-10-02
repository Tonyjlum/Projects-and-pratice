import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <div id="navbar">
        <span>profile</span>
        <span> | </span>
        <span>transactions</span>
      </div>
    );
  }

}

export default withRouter((Navbar));
