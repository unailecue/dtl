import React, { Component } from "react";
import "./../assets/style/App.css";
import "./../assets/style/components.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import Header from "../components/header";
// import PostionSizingOld from "./position-sizing-old";
import PositionSizing from "./PositionSizing";
// import TradingData from "./tradingData";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";

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
        {/* <TradingData /> */}
        <PositionSizing />



        {/* <PostionSizingOld /> */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer />
      </div>
    );
  }
}

export default App;
