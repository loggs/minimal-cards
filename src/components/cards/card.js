import React, { Component } from "react";
import { connect } from "react-redux";
import CardFace from "./card-face";
import { flipCard, mouseDown } from "../../actions/index";
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
        translateX: 0, //spring(x, { stiffness: 120, damping: 14 }),
        translateY: spring(y, { stiffness: 120, damping: 14 }),
        scale: spring(1.1, { stiffness: 120, damping: 17 })
      };
    } else {
      y = 0; // layout[visualPosition];
      x = 0;
      style = {
        translateX: spring(x, { stiffness: 120, damping: 14 }),
        translateY: spring(y, { stiffness: 120, damping: 14 }),
        scale: spring(1, { stiffness: 180, damping: 10 })
      };
    }
    const coords = [x, y];
    return (
      <Motion key={uniqueId} style={style}>
        {({ translateX, translateY, scale }) => {
          const moverObject = {
            WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
            transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
            zIndex: uniqueId === cards.lastPressed ? 99 : 1
          };

          const backgroundColor =
            uniqueId === cards.lastPressed && cards.isPressed
              ? "white"
              : "inherit";

          return (
            <div style={moverObject} onClick={event => event.stopPropagation()}>
              <div
                className={"flip-container " + extraClass}
                onClick={() => flipCard(uniqueId)}
              >
                <div className="flipper">
                  <CardFace
                    id={uniqueId}
                    side="front"
                    style={{ backgroundColor: backgroundColor }}
                    onMouseDown={this.props.mouseDown.bind(
                      null,
                      uniqueId,
                      coords
                    )}
                  />
                  <CardFace
                    id={uniqueId}
                    side="back"
                    style={{ backgroundColor: backgroundColor }}
                    onMouseDown={this.props.mouseDown.bind(
                      null,
                      uniqueId,
                      coords
                    )}
                  />
                </div>
              </div>
            </div>
          );
        }}
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
