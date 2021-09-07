import React, { Component, useEffect } from "react";
import Conect from "./../utils/conections";
import { FaPlayCircle, FaPlay, FaStop, FaStopCircle } from 'react-icons/fa';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
class TradingData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMessage: "",
            value: '',
            executing: false,
            priceValue: null,
            clickButtonText: "Buscar precio",
        };
        //Here we handle the bind, avoiding the use on the HTML
        this.handleChange = this.handleChange.bind(this);
        this.clickEvent = this.clickEvent.bind(this);
    }


    toggleExecuteValues() {
        //this funciton changes the values of the buttons and inputs after making a change
        if (this.state.executing) {
            this.setState({ clickButtonText: "Buscar Precio", executing: !this.state.executing })
        } else {
            this.setState({ clickButtonText: "Detener busqueda", executing: !this.state.executing })
        }
    }

    handleChange(event) {
        //is used to store everytime that a key is typed in the input
        this.setState({ value: event.target.value });
    }
    async clickEvent(e) {
        //event when the main button is clicked
        e.preventDefault();
        console.log("estos son los valores del state", this.state);
        let valueToSend = this.state.value || e.target.value;
        if (valueToSend) {
            this.toggleExecuteValues();
            this.oldlooper(valueToSend);
        } else {
            alert("Debes seleccionar una opción, este no es el tipo de alerta que se requiere pero hay que avisar")
        }
    }

    async oldlooper(valueToSend) {
        //loop event using setInterval instead of useEffect
        let oldthis = this;
        var refreshIntervalId = setInterval(async function () {

            if (oldthis.state.executing) {
                let priceValue = await Conect.getPrice(valueToSend);
                if (priceValue !== undefined) {
                    oldthis.setState({ priceValue })
                } else {
                    console.error("stop looper by the error above");
                    oldthis.setState({ error: true, executing: false })
                    clearInterval(refreshIntervalId);
                }
            } else {
                clearInterval(refreshIntervalId);
            }
        }, 5000);
    }

    render() {
        return (
            <div className="search-input container">
                <form>
                    <label>
                        <span>
                            Nombre de la acción:
                            {/* <FaPlayCircle />
                            <FaPlay />
                            <FaStop />
                            <FaStopCircle />
                            <AiFillPlayCircle />
                            <AiFillPauseCircle /> */}
                        </span>
                        <input type="text" disabled={this.state.executing} value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <button onClick={this.clickEvent} className={!this.state.executing ? "button execute" : "button error"}>
                        {/* {this.state.clickButtonText} */}
                        <span className="tooltiptext">{this.state.executing ? "Pausar petición" : "Realizar petición"}</span>
                        <div className="button-container">

                            {this.state.executing ?

                                <FaStop /> :
                                <FaPlay />
                            }
                        </div>
                    </button>

                    <div hidden={this.state.priceValue == null}>Precio de :{this.state.priceValue}</div>
                    <div hidden={!this.state.error}>Existio un error, por favor intenta mas tarde</div>
                </form>
            </div>
        );
    }
}
export default TradingData;