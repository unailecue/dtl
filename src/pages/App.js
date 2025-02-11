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

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID699991483429,
    appId: process.env.REACT_APP_ID1,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


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

