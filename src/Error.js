import React, { Component } from "react";
import PropTypes from "prop-types";

class AppError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Whoops. Notes could not be noted, please try again later.</h2>;
    }
    return this.props.children;
  }
}

export default AppError;

AppError.propTypes = {
  children: PropTypes.object,
};
