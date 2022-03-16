import React, { Component } from "react";
import "./../assets/style/App.css";
import "./../assets/style/components.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from "../components/header";
import PositionSizing from "./PositionSizing";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
            {/* <TradingData /> */}
            <PositionSizing />
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
    )
}

//TODO: hay que agregar aqui el customhook del localstorage con el idioma predefinido y el useEffect de cuando inicializa dicha accion