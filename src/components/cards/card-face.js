import React, { Component } from "react";
import { connect } from "react-redux";
import { editCard, toggleCardMode, deleteCard } from "../../actions/index";

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

    /* Differentiate edit modes */

    const isBeingEdited = edit_mode ? " editing" : "";

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
        <div className="content-text">{cardValue}</div>
      );

    return (
      <div
        className={side + isBeingEdited}
        onDoubleClick={event => {
          event.stopPropagation();
          return toggleCardMode(id);
        }}
      >
        <div
          className="mover"
          onMouseDown={this.props.onMouseDown}
          onTouchStart={this.props.onTouchStart}
        >
          <i className="arrow fa fa-arrows-v" />
        </div>
        <div className="editor">
          <i className="pencil fa fa-pencil" />
        </div>

        <div className="dot">
          <button id="delete-card" onClick={() => this.props.deleteCard(id)}>
            x
          </button>
        </div>

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
  { editCard, toggleCardMode, deleteCard }
)(CardFace);
