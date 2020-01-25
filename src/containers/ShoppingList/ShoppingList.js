import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free-solid";

class ShoppingList extends Component {
  render() {
    return (
      <div className="item">
        <img src={this.props.imgUrl} alt={this.props.itemName} width="100%" />
        <h4>{this.props.itemName}</h4>
        <div className="itemPrice">
          <ul>
            <li>
              <FontAwesomeIcon icon="rupee-sign" size="sm" />{" "}
              {this.props.itemPrice * ((100 - this.props.itemDiscount) / 100)}
            </li>
            <li>{this.props.itemPrice}</li>
            <li>{this.props.itemDiscount}% off</li>
          </ul>
        </div>
        <button className="addButton" onClick={this.props.clicked}>
          Add to Cart
        </button>
      </div>
    );
  }
}

export default ShoppingList;
