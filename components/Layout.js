import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <Header />
        {children}
      </div>
    );
  }
}
