import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Login extends Component {
  state = {
    email: "",
    password: "",
}

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleNewAccount = () => {
    this.props.history.push("/register")
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/v1/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then( response => response.json())
    .then( user => {
      console.log(user)
      //push in to stock page

      this.props.history.push("/register")
    })
  }

  render() {
    return (
      <div className="center">
        <form
          className= "login-form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}>
          <h2 className="center-text">Sign In</h2>
          <input
            className="form-input"
            id="email"
            placeholder="Email"
            value={this.state.email}
            required/>
          <br/>
          <input
            className="form-input"
            type= "password"
            id="password"
            placeholder="password"
            value={this.state.password}
            required/>
          <br/>
          <input
            className="button"
            type="submit"
            value="Login"/>
        </form>
        <button
          id="register-button"
          onClick={this.handleNewAccount}
        >Register</button>
      </div>
    );
  }

}

export default withRouter((Login));