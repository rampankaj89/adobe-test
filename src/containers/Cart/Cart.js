import React, { Component } from "react";
import "./Cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free-solid";

class Cart extends Component {
  render() {
    return (
      <div className="AppCart">
        <FontAwesomeIcon icon="shopping-cart" className="searchIcon" />
        <span className="itemCount">{this.props.count}</span>
      </div>
    );
  }
}

export default Cart;
