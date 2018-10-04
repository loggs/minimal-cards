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
        <div className="center">
          <button className="add-card" onClick={() => this.props.addCard()}>
            <div className="add-card-text">+</div>
          </button>
        </div>
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
