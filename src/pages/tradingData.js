import React, { Component } from "react";
class TradingData extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        //Se maneja el bind desde aqui para evitar tratarlo dentro del html
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickEvent = this.clickEvent.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    clickEvent(e) {
        e.preventDefault();
        console.log("si entro aqui");
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Nombre de la acción:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <button onClick={this.clickEvent}>clickme</button>
            </form>
        );
    }
}
export default TradingData;