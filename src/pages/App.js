import React, { Component, useState } from "react";
import "./../assets/style/App.css";
import "./../assets/style/components.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from "../components/header";
import PositionSizing from "./PositionSizing";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import TutorialVideo from "../components/TutorialVideo";

export default function App() {
    const [tutorialVideoVisible, setTutorialVideoVisible] = useState(false);
    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
            {/* <TradingData /> */}
            <TutorialVideo visible={tutorialVideoVisible} setVisible={setTutorialVideoVisible} />
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
            <Footer setTutorialVideoVisible={setTutorialVideoVisible} />
        </div>
    )
}

//TODO: hay que agregar aqui el customhook del localstorage con el idioma predefinido y el useEffect de cuando inicializa dicha accion