import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import "../../style/app.css";

class App extends Component {
  state = true;

  onTouchStart() {
    this.setState(false);
  }

  render() {
    const extraClass = this.state ? "" : "hover";
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
export default App;
