import React, { Component } from "react";
import "./../assets/style/App.css";
import "./../assets/style/components.css";


import Header from "./../components/header";
import TradingData from "./tradingData";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.clickEvent = this.clickEvent.bind(this);
  }
  clickEvent(e) {
    e.preventDefault();
    console.log("si entro en el elemento padre");
    console.log(this.state);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <TradingData />
        <button onClick={this.clickEvent}>clickme</button>
      </div>
    );
  }
}

export default App;
