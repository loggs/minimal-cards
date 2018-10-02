import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import "../style/app.css";
import { flipCard } from "../actions/index";

class App extends Component {
  onTouchStart() {
    this.props.flipCard();
    this.onTouchStart.bind(this);
  }

  render() {
    const extraClass = this.props.flipped ? "" : "hover";
    return (
      <div
        className={"flip-container " + extraClass}
        onTouchStart={this.onTouchStart}
      >
        <div className="flipper">
          <div className="front">Front!</div>
          <div className="back">Back!</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { flipped: state.flipped };
}

export default connect(
  mapStateToProps,
  { flipCard }
)(App);
