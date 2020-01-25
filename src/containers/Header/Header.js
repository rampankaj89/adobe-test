import React, { Component } from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free-solid";
import Cart from "../Cart/Cart";
import Search from "../Search/Search";

class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="AppHeader">
        <div className="container">
          <div className="AppLogo">
            <NavLink to="/" exact>
              <FontAwesomeIcon icon="star" size="lg" />
            </NavLink>
          </div>
          <div className="AppSearchCart">
            <Search click={this.props.search} reset={this.props.resetSearch} />
            <NavLink to="/checkout" exact>
              <Cart count={this.props.itemCount} />
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
