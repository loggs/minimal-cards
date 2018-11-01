import React, { Component } from "react";
import { connect } from "react-redux";
import { editCard, toggleCardMode } from "../../actions/index";

class CardFace extends Component {
  handleChange(event) {
    const { id, editCard } = this.props;
    return editCard(id, event.target.value);
  }

  render() {
    /* Destructure props */
    const {
      side,
      front_text,
      back_text,
      id,
      toggleCardMode,
      edit_mode,
      flipped
    } = this.props;

    const is_front = side === "front";

    /* Get the card class and value depending on the side */
    const cardValue = side === "front" ? front_text : back_text;

    /* Get the content depending on whether the card is flipped or not */
    const text_or_input =
      edit_mode && ((is_front && !flipped) || (!is_front && flipped)) ? (
        <textarea
          className="card-input"
          value={cardValue}
          onClick={event => event.stopPropagation()}
          onInput={this.handleChange.bind(this)}
        />
      ) : (
        cardValue
      );

    return (
      <div
        className={side}
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
    front_text: state.cards.data[props.id].front_text,
    edit_mode: state.cards.data[props.id].edit_mode,
    back_text: state.cards.data[props.id].back_text,
    flipped: state.cards.data[props.id].flipped
  };
}

export default connect(
  mapStateToProps,
  { editCard, toggleCardMode }
)(CardFace);
