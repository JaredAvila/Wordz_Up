import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import * as styles from "./URLLink.module.css";

class URLLink extends Component {
  state = {
    redirect: false
  };

  handleClick = () => {
    this.props.action(this.props.url);
    this.setState({ redirect: true });
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={this.props.url} />;
    }
    return (
      <p className={styles.URLLink} onClick={this.handleClick}>
        {this.props.children}
      </p>
    );
  }
}

export default URLLink;
