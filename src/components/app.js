import React, { Component } from "react";
import { connect } from "react-redux";
import { animateScroll } from "react-scroll";
import Card from "./cards/card";
import { addCard } from "../actions/index";
import _ from "lodash";
import "../style/app.css";

class App extends Component {
  /* Auto scroll to bottom of page when new card is added */

  renderCards() {
    return _.map(this.props.cards, (card, k) => {
      return <Card key={k} uniqueId={k} data={card} />;
    });
  }

  clickAddButton() {
    this.props.addCard();
    animateScroll.scrollToBottom({ duration: 650, isDynamic: true });
  }

  render() {
    return (
      <div>
        <div className="menuButton">
          <div className="menuBar1" />
          <div className="menuBar2" />
          <div className="menuBar3" />
        </div>
        {this.renderCards()}
        <div className="center">
          <button className="add-card" onClick={this.clickAddButton.bind(this)}>
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
