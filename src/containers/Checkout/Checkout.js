import React, { Component } from "react";
import "./Checkout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free-solid";

class Checkout extends Component {
  state = {
    checkoutItems: []
  };
  componentDidMount() {
    this.setState({ checkoutItems: this.props.itemDetails });
  }

  render() {
    if (this.state.checkoutItems) {
      const itemList = this.state.checkoutItems;
      console.log("this.state.checkoutItems", itemList);
      //debugger;
    }
    let listedCartItems = "";
    console.log("checkout props", this.props.itemDetails);
    if (this.props.itemDetails.length > 0) {
      listedCartItems = this.props.itemDetails.map((cartRes, index) => {
        console.log("cartRes", cartRes);
        return (
          <div className="checkoutList" key={index}>
            <img src={cartRes.img_url} className="image" alt="" />
            <div className="itemDetail">
              <div>{cartRes.name}</div>
              <div className="itemPrice">
                <ul>
                  <li>
                    <FontAwesomeIcon icon="rupee-sign" size="sm" />{" "}
                    {cartRes.price * ((100 - cartRes.discount) / 100)}
                  </li>
                  <li>{cartRes.price}</li>
                  <li>{cartRes.discount}% off</li>
                </ul>
              </div>
            </div>
            <div className="itemCount">
              <div className="itemPlusMinus">
                <span>-</span>
              </div>
              <div className="itemNum">
                <span>1</span>
              </div>
              <div className="itemPlusMinus">
                <span>+</span>
              </div>
            </div>
            <div className="itemRemove">Remove</div>
          </div>
        );
      });
    } else {
      listedCartItems = <div>No Item Selected</div>;
    }
    return (
      <div className="checkout">
        <div className="checkoutLeft">
          {/* checkoutLeft */}
          {listedCartItems}
        </div>
        {/* checkoutRight */}
        <div className="checkoutRight">
          <div className="crTitle">Price Details</div>
          <div className="priceDiscount">
            <ul>
              <li>
                <span>Price (1 item)</span>
                <span>
                  <FontAwesomeIcon icon="rupee-sign" size="sm" /> 900
                </span>
              </li>
              <li>
                <span>Discount</span>
                <span>
                  <FontAwesomeIcon icon="rupee-sign" size="sm" /> 579
                </span>
              </li>
            </ul>
          </div>
          <div className="totalPrice">
            <ul>
              <li>
                <span>Total Payable</span>
                <span>
                  <FontAwesomeIcon icon="rupee-sign" size="sm" /> 319
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
