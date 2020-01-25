import React, { Component } from "react";
import Header from "../Header/Header";
import InputRange from "react-input-range";
import Axios from "axios";

import { Route, Switch } from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import "react-input-range/lib/css/index.css";
import "./ShoppingSite.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free-solid";
import ShoppingList from "../ShoppingList/ShoppingList";

class ShoppingSite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 0, max: 1000 },
      itemList: null,
      searchResult: null,
      filteredItem: null,
      showFilteredItem: false,
      cartItems: []
    };
  }

  componentDidMount() {
    Axios.get("https://api.myjson.com/bins/qzuzi").then(response => {
      this.setState({ itemList: response.data });
    });
  }

  render() {
    let items = null;
    let headerWithCount = (
      <Header
        search={e => searchItem(e)}
        resetSearch={e => resetSearch(e)}
        itemCount={
          this.state.cartItems.length > 0 ? this.state.cartItems.length : 0
        }
      />
    );

    const addToCart = value => {
      console.log("item id", value, this.state.cartItems.length);
      let addedItem = this.state.itemList.filter(item => item.id === value);
      this.state.cartItems.push(...addedItem);
      console.log("addedItemList", this.state.cartItems);
    };

    if (this.state.cartItems.length > 0) {
      headerWithCount = (
        <Header
          search={e => searchItem(e)}
          resetSearch={e => resetSearch(e)}
          itemCount={this.state.cartItems.length}
        />
      );
    }

    if (this.state.showFilteredItem) {
      items = this.state.filteredItem.map(res => {
        return (
          <ShoppingList
            key={res.id}
            imgUrl={res.img_url}
            itemName={res.name}
            itemPrice={res.price}
            itemDiscount={res.discount}
            clicked={() => addToCart(res.id)}
          />
        );
      });
    } else if (this.state.searchResult) {
      if (this.state.searchResult.length === 0) {
        items = <h3>No Result Found!</h3>;
      } else {
        items = this.state.searchResult.map(res => {
          return (
            <ShoppingList
              key={res.id}
              imgUrl={res.img_url}
              itemName={res.name}
              itemPrice={res.price}
              itemDiscount={res.discount}
              clicked={() => addToCart(res.id)}
            />
          );
        });
      }
    } else if (!this.state.searchResult && this.state.itemList) {
      items = this.state.itemList.map(res => {
        return (
          <ShoppingList
            key={res.id}
            imgUrl={res.img_url}
            itemName={res.name}
            itemPrice={res.price}
            itemDiscount={res.discount}
            clicked={() => addToCart(res.id)}
          />
        );
      });
    }

    const searchItem = value => {
      if (value) {
        let searchInputValue = this.state.itemList.filter(
          item => item.name.toLowerCase() === value.toLowerCase()
        );

        if (searchInputValue) {
          this.setState({ searchResult: searchInputValue });
        }
      }
    };

    const resetSearch = () => {
      this.setState({ searchResult: null });
    };

    const sortLowToHigh = () => {
      if (this.state.showFilteredItem) {
        let lth = this.state.filteredItem.sort((a, b) => {
          return a.price - b.price;
        });
        this.setState({ filteredItem: lth });
      } else {
        let lth = this.state.itemList.sort((a, b) => {
          return a.price - b.price;
        });
        this.setState({ itemList: lth });
      }
    };

    const sortHighToLow = () => {
      if (this.state.showFilteredItem) {
        let htl = this.state.filteredItem.sort((a, b) => {
          return b.price - a.price;
        });
        this.setState({ filteredItem: htl });
      } else {
        let htl = this.state.itemList.sort((a, b) => {
          return b.price - a.price;
        });
        this.setState({ itemList: htl });
      }
    };

    const sortDiscount = () => {
      if (this.state.showFilteredItem) {
        let dis = this.state.filteredItem.sort((a, b) => {
          return a.discount - b.discount;
        });
        this.setState({ filteredItem: dis });
      } else {
        let dis = this.state.itemList.sort((a, b) => {
          return a.discount - b.discount;
        });
        this.setState({ itemList: dis });
      }
    };

    const priceRangeFilter = () => {
      console.log("priceRange", this.state.value);

      let priceRangeItem = this.state.itemList.filter(item => {
        return (
          item.price >= this.state.value.min &&
          item.price <= this.state.value.max
        );
      });

      console.log("priceRangeItem", priceRangeItem);
      this.setState({ filteredItem: priceRangeItem, showFilteredItem: true });
    };

    return (
      <div>
        <Header
          search={e => searchItem(e)}
          resetSearch={e => resetSearch(e)}
          itemCount={
            this.state.cartItems.length > 0 ? this.state.cartItems.length : 0
          }
        />
        <Switch>
          <Route path="/" exact>
            <div className="contentBody">
              <div className="leftFilters">
                <h3 className="filterTitle">Filters</h3>

                <div className="rangeSection">
                  <InputRange
                    maxValue={1000}
                    minValue={0}
                    formatLabel={value => `Rs.${value}`}
                    value={this.state.value}
                    onChange={value => this.setState({ value })}
                  />
                  <div className="rangeLabel">Price</div>
                  <button className="filterBtn" onClick={priceRangeFilter}>
                    Apply
                  </button>
                </div>
              </div>

              <div className="rightSection">
                <div className="sort">
                  <ul className="sortList">
                    <li>Sort By</li>
                    <li>
                      <span onClick={sortHighToLow}>Price -- High Low</span>
                    </li>
                    <li>
                      <span onClick={sortLowToHigh}>Price -- Low High</span>
                    </li>
                    <li>
                      <span onClick={sortDiscount}>Discount</span>
                    </li>
                  </ul>
                </div>

                <div className="itemList">{items}</div>
              </div>
            </div>
          </Route>
          <Route
            path="/checkout"
            component={() => <Checkout itemDetails={this.state.cartItems} />}
          />
        </Switch>
      </div>
    );
  }
}

export default ShoppingSite;
