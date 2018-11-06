import React, { Component } from "react";
import { connect } from "react-redux";
import CardFace from "./card-face";
import { flipCard } from "../../actions/index";
import { Motion, spring } from "react-motion";

class Card extends Component {
  render() {
    let x;
    let y;
    let style;
    const height = 295;
    const { uniqueId, data, flipCard, cards } = this.props;
    const cardCount = cards.order.length;
    // For each position get the designated height
    const layout = [...Array(cardCount).keys()].map(n => {
      const row = Math.floor(n / cardCount);
      return height * row;
    });

    const extraClass = data.flipped ? "hover" : "";
    const visualPosition = cards.order.indexOf(uniqueId);
    if (uniqueId === cards.lastPressed && cards.isPressed) {
      [x, y] = cards.mouseXY;
      style = {
        translateX: x,
        translateY: y,
        scale: spring(1.2, { stiffness: 180, damping: 10 })
      };
    } else {
      y = layout[visualPosition];
      style = {
        translateX: 0,
        translateY: spring(y, { stiffness: 120, damping: 17 }),
        scale: spring(1, { stiffness: 180, damping: 10 })
      };
    }
    return (
      <Motion key={uniqueId} style={style}>
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
  ({ cards }) => ({
    cards
  }),
  { flipCard }
)(Card);
