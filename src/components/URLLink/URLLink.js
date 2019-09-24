import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import * as styles from "./URLLink.module.css";

class URLLink extends Component {
  state = {
    redirect: false
  };

  componentDidUpdate() {
    console.log("update");
  }

  handleClick = () => {
    this.setState({ redirect: true });
    console.log("clicked ", this.state);
  };
  render() {
    let markUp = (
      <p className={styles.URLLink} onClick={this.handleClick}>
        {this.props.children}
      </p>
    );
    if (this.state.redirect) {
      return <Redirect to={this.props.url} />;
    }
    return markUp;
  }
}

export default URLLink;
