import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleMenu } from "../actions/index";

class Menu extends Component {
  render() {
    const { menuOptions, toggleMenu } = this.props;
    const isMenuOpen = menuOptions.menuOpen ? "open " : "";
    return (
      <div>
        <div className={"menu " + isMenuOpen}>
          <h3>MinimalCards</h3>
        </div>
        <div
          className={"menuButton " + isMenuOpen}
          onClick={() => toggleMenu()}
        >
          <div className="menuBar1" />
          <div className="menuBar2" />
          <div className="menuBar3" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ menuOptions }) {
  return { menuOptions };
}

export default connect(
  mapStateToProps,
  { toggleMenu }
)(Menu);
