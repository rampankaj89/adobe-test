import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
// import { Route, Switch } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free-solid";
import ShoppingSite from "./containers/ShoppingSite/ShoppingSite";
// import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ShoppingSite />
      </BrowserRouter>
    </div>
  );
}

export default App;
