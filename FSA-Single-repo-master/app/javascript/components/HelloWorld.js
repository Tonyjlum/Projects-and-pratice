import React from "react"
import PropTypes from "prop-types"

class HelloWorld extends React.Component {
  render () {
    console.log("its working")
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
        testing from comp
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};

export default HelloWorld
