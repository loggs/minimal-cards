import React, { Component } from "react";
import { connect } from "react-redux";

class CardFront extends Component {
  render() {
    return <div className="front">{this.props.front_text}</div>;
  }
}

function mapStateToProps(state, props) {
  return {
    front_text: state.cards[props.id].front_text
  };
}

export default connect(
  mapStateToProps,
  null
)(CardFront);
