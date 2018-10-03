import React, { Component } from "react";
import { connect } from "react-redux";
import CardFront from "./card-front";
import CardBack from "./card-back";
import { flipCard } from "../../actions/index";

class Card extends Component {
  onDivClick = () => {
    console.log(this.props.flipped);
    this.props.flipCard();
  };

  render() {
    const extraClass = this.props.flipped ? "hover" : "";
    return (
      <div className={"flip-container " + extraClass} onClick={this.onDivClick}>
        <div className="flipper">
          <CardFront />
          <CardBack />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ flipped }) {
  return { flipped };
}

export default connect(
  mapStateToProps,
  { flipCard }
)(Card);
