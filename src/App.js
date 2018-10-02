import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

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
