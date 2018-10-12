import React, { Component } from "react";
import { connect } from "react-redux";
import { editCard, toggleCardMode } from "../../actions/index";

class CardFace extends Component {
  handleChange(event) {
    const { id, editCard } = this.props;
    return editCard(id, event.target.value);
  }

  render() {
    /* Get the card class and value depending on the side */
    const cardValue =
      this.props.side == "front" ? this.props.front_text : this.props.back_text;

    /* Get the content depending on whether the card is flipped or not */
    const text_or_input = this.props.edit_mode ? (
      <textarea
        className="card-input"
        value={cardValue}
        onClick={event => event.stopPropagation()}
        onInput={this.handleChange.bind(this)}
      />
    ) : (
      cardValue
    );

    const { id, toggleCardMode } = this.props;

    return (
      <div
        className={this.props.side}
        onDoubleClick={event => {
          event.stopPropagation();
          return toggleCardMode(id);
        }}
      >
        {text_or_input}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    front_text: state.cards[props.id].front_text,
    edit_mode: state.cards[props.id].edit_mode,
    back_text: state.cards[props.id].back_text,
    flipped: state.cards[props.id].flipped
  };
}

export default connect(
  mapStateToProps,
  { editCard, toggleCardMode }
)(CardFace);
