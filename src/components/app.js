import React, { Component } from "react";
import { connect } from "react-redux";

import "../style/app.css";
import { flipCard } from "../actions/index";

class App extends Component {
  onDivClick = () => {
    console.log(this.props.flipped);
    this.props.flipCard();
  };

  render() {
    const extraClass = this.props.flipped ? "hover" : "";
    return (
      <div className={"flip-container " + extraClass} onClick={this.onDivClick}>
        <div className="flipper">
          <div className="front">Front!</div>
          <div className="back">Back!</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ flipped }) {
  return { flipped };
}

export default connect(
  mapStateToProps,
  { flipCard }
)(App);
