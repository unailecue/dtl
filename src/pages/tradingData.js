import React, { Component, useEffect } from "react";
import Conect from "./../utils/conections";
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
            this.setState({ clickButtonText: "Buscar Precio", disableForm: !this.state.executing })
        } else {
            this.setState({ clickButtonText: "Detener busqueda", disableForm: !this.state.executing })
        }
    }

    handleChange(event) {
        //is used to store everytime that a key is typed in the input
        this.setState({ value: event.target.value });
    }
    async clickEvent(e) {
        //event when the main button is clicked
        e.preventDefault();
        this.toggleExecuteValues()
        let valueToSend = this.state.value || e.target.value;
        this.oldlooper(valueToSend)
    }

    async oldlooper(valueToSend) {
        //loop event using setInterval instead of useEffect
        let oldthis = this;
        var refreshIntervalId = setInterval(async function () {

            if (oldthis.state.disableForm) {
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
            <form>
                <label>
                    Nombre de la acción:
                    <input type="text" disabled={this.state.executing} value={this.state.value} onChange={this.handleChange} />
                </label>
                <button onClick={this.clickEvent}>{this.state.clickButtonText}</button>
                <div hidden={this.state.priceValue == null}>Precio de :{this.state.priceValue}</div>
                <div hidden={!this.state.error}>Existio un error, por favor intenta mas tarde</div>
            </form>
        );
    }
}
export default TradingData;