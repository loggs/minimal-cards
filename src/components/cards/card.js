import React, { Component } from "react";
import { connect } from "react-redux";
import CardFace from "./card-face";
import { flipCard, mouseDown } from "../../actions/index";
import { Motion, spring } from "react-motion";

class Card extends Component {
  handleTouchStart(key, pressLocation, e) {
    this.props.mouseDown(key, pressLocation, e.touches[0]);
  }

  render() {
    let x;
    let y;
    let style;
    const height = 295;
    const { uniqueId, data, flipCard, cards, mouseDown } = this.props;
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
      x = 0;
      style = {
        translateX: 0,
        translateY: spring(y, { stiffness: 120, damping: 17 }),
        scale: spring(1, { stiffness: 180, damping: 10 })
      };
    }
    return (
      <Motion key={uniqueId} style={style}>
        {({ translateX, translateY, scale }) => (
          <div
            className={"flip-container " + extraClass}
            onClick={() => flipCard(uniqueId)}
            // onMouseDown={() => mouseDown(null, uniqueId, [x, y])}
            // onTouchStart={this.handleTouchStart.bind(null, uniqueId, [x, y])}
          >
            <div
              className="flipper"
              style={{
                // WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                // transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                zIndex: uniqueId === cards.lastPressed ? 99 : visualPosition
              }}
            >
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
  { flipCard, mouseDown }
)(Card);
