import React, { Component } from "react";
import { connect } from "react-redux";
import { animateScroll } from "react-scroll";
import Card from "./cards/card";
import Menu from "./menu";
import { addCard, fetchCards, mouseMove, mouseUp } from "../actions/index";
import "../style/app.css";

class App extends Component {
  componentWillMount() {
    this.props.fetchCards();
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.props.mouseMove);
    window.addEventListener("mouseup", this.props.mouseUp);
  }

  renderCards() {
    const { data, order } = this.props.cards;
    return order.map(card => {
      return <Card key={card} uniqueId={card} data={data[card]} />;
    });
  }

  clickAddButton() {
    this.props.addCard();
    /* Auto scroll to bottom of page when new card is added */
    animateScroll.scrollToBottom({ duration: 650, isDynamic: true });
  }

  render() {
    return (
      <div>
        <Menu />
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
  { addCard, fetchCards, mouseUp, mouseMove }
)(App);
