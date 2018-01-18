// src/components/About/index.js
import React, { Component } from "react";
import classnames from "classnames";

import "./style.css";

export default class About extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames("About", className)} {...props}>
        <h1>This is a project and task management system for the chosen.</h1>
      </div>
    );
  }
}
