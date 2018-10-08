import React, { Component } from "react";
import { connect } from "react-redux";
import CardFront from "./card-front";
import CardBack from "./card-back";
import { flipCard } from "../../actions/index";

class Card extends Component {
  render() {
    const { uniqueId, data, flipCard } = this.props;
    const extraClass = data.flipped ? "hover" : "";
    return (
      <div
        className={"flip-container " + extraClass}
        onClick={() => flipCard(uniqueId)}
      >
        <div className="flipper">
          <CardFront id={uniqueId} />
          <CardBack id={uniqueId} />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { flipCard }
)(Card);
