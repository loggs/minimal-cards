import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./cards/card";
import { addCard } from "../actions/index";
import _ from "lodash";
import "../style/app.css";

class App extends Component {
  renderCards() {
    return _.map(this.props.cards, (card, k) => {
      return <Card key={k} uniqueId={k} data={card} />;
    });
  }

  render() {
    return (
      <div>
        {this.renderCards()}
        <button onClick={() => this.props.addCard()}>+</button>
      </div>
    );
  }
}

function mapStateToProps({ cards }) {
  return { cards };
}

export default connect(
  mapStateToProps,
  { addCard }
)(App);
