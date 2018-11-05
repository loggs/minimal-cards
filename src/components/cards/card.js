import React, { Component } from "react";
import { connect } from "react-redux";
import CardFace from "./card-face";
import { flipCard } from "../../actions/index";
import { Motion, spring } from "react-motion";

class Card extends Component {
  render() {
    const { uniqueId, data, flipCard } = this.props;
    const extraClass = data.flipped ? "hover" : "";
    return (
      <Motion key={uniqueId} style={{ translateX: 0 }}>
        {({ translateX, translateY, scale, boxShadow }) => (
          <div
            className={"flip-container " + extraClass}
            onClick={() => flipCard(uniqueId)}
          >
            <div className="flipper">
              <CardFace id={uniqueId} side="front" />
              <CardFace id={uniqueId} side="back" />
            </div>
          </div>
        )}
      </Motion>
    );
  }
}

export default connect(
  null,
  { flipCard }
)(Card);
