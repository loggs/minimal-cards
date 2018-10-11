import React, { Component } from "react";
import { connect } from "react-redux";
import { editCard, toggleCardMode } from "../../actions/index";

class CardFront extends Component {
  handleChange(event) {
    const { id, editCard } = this.props;
    return editCard(id, event.target.value);
  }

  render() {
    const text_or_input = this.props.edit_mode ? (
      <textarea
        className="card-input"
        value={this.props.front_text}
        onClick={event => event.stopPropagation()}
        onInput={this.handleChange.bind(this)}
      />
    ) : (
      this.props.front_text
    );
    const { id, toggleCardMode } = this.props;
    return (
      <div
        className="front"
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
    edit_mode: state.cards[props.id].edit_mode
  };
}

export default connect(
  mapStateToProps,
  { editCard, toggleCardMode }
)(CardFront);
