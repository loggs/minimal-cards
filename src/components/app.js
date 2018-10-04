import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./cards/card";
import { addCard } from "../actions/index";
import _ from "lodash";
import "../style/app.css";

class App extends Component {
  /* Auto scroll to bottom of page when new card is added */
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

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
        {/* Add empty div to move to when new card is added */}
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
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
