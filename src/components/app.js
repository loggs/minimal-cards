import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./cards/card";
import "../style/app.css";

class App extends Component {
  render() {
    return <Card />;
  }
}

function mapStateToProps({ flipped }) {
  return { flipped };
}

export default connect(
  mapStateToProps,
  null
)(App);
