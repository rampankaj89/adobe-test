import React, { Component } from "react";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free-solid";

class Search extends Component {
  state = {
    inputValue: ""
  };

  render() {
    let reset = "";
    const inputValue = event => {
      this.setState({ inputValue: event.target.value });
    };

    if (this.state.inputValue) {
      reset = (
        <FontAwesomeIcon
          icon="times"
          className="resetSearchIcon"
          onClick={() => {
            this.props.reset();
            this.setState({ inputValue: "" });
          }}
        />
      );
    }

    return (
      <div className="AppSearch">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={inputValue}
        />
        <FontAwesomeIcon
          icon="search"
          className="searchIcon"
          onClick={() => this.props.click(this.state.inputValue)}
        />
        {reset}
      </div>
    );
  }
}

export default Search;
