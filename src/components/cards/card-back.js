import React, { Component } from "react";
import { connect } from "react-redux";

class CardBack extends Component {
  render() {
    return <div className="back">{this.props.back_text}</div>;
  }
}

function mapStateToProps(state, props) {
  return {
    back_text: state.cards[props.id].back_text
  };
}

export default connect(
  mapStateToProps,
  null
)(CardBack);
