import React, { Component } from "react";
import { connect } from "react-redux";
import { editCard, toggleCardMode } from "../../actions/index";

class CardFront extends Component {
  handleChange(event) {}

  render() {
    const text_or_input = this.props.edit_mode ? (
      <p>In edit mode!</p>
    ) : (
      this.props.front_text
    );
    return (
      <div
        className="front"
        onDoubleClick={() => this.props.toggleCardMode(this.props.id)}
      >
        {text_or_input}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    front_text: state.cards[props.id].front_text,
    edit_mode: state.cards[props.id].edit_mode
  };
}

export default connect(
  mapStateToProps,
  { editCard, toggleCardMode }
)(CardFront);
