import React, { Component, useEffect } from "react";
import "./../assets/style/components.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table } from 'react-bootstrap';
class PostionSizing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            //inputs
            typeLong: true,
            maxSize: null,
            maxLoss: null,
            risk: null,
            reward: null,
            sharesAmmount: null,
            sharesPrice: null,
            referenceEntry: null,


            //outputs
            averagePrice: null,
            shares: null,
            riskRewards: null,
            loss: null,
            riskPercent: null,
            rewardPercent: null,
            referenceShare: null,

            //records
            transactions: []
            //   
        };


        //Here we handle the bind, avoiding the use on the HTML
        this.handleChange = this.handleChange.bind(this);
        this.checkState = this.checkState.bind(this);

        this.onLongType = this.onLongType.bind(this);
        this.onShortType = this.onShortType.bind(this);

        //inputsc
        this.getMaxSize = this.getMaxSize.bind(this);
        this.getMaxLoss = this.getMaxLoss.bind(this);
        this.getRisk = this.getRisk.bind(this);
        this.getReward = this.getReward.bind(this);
        this.getReferenceEntry = this.getReferenceEntry.bind(this);

        //input for records
        this.getSharesAmmount = this.getSharesAmmount.bind(this);
        this.getSharesPrice = this.getSharesPrice.bind(this);

        //operations
        this.excuteTransaction = this.excuteTransaction.bind(this);
        this.updateRiskReward = this.updateRiskReward.bind(this);

        // arreglar visualizacion de cajas
        // archivo translate
        // boton que maneje translate
        // Buscar poder exportar el proyecto
        // Revisar formulas


    }
    checkState(event) {
        console.log(this.state);
    }
    updateValues() {
        console.log("updatevalues");
        let oldthis = this;
        // esta funcion no deberia ser por timeout pero es la solucion que consigui por ahora
        setTimeout(
            () => {
                oldthis.updateRiskReward();
                oldthis.updateLoss();
                oldthis.updateRiskPercent();
                oldthis.updateReferenceShare();
                oldthis.updateRewardPercent();

            }, 100);
    }

    excuteTransaction() {
        console.log("execute Transaction");
        let sharesAmmount = this.state.sharesAmmount;
        let sharesPrice = this.state.sharesPrice;
        if (this.validateNumberValue(sharesAmmount) && this.validateNumberValue(sharesPrice)) {
            if (this.updateShares(sharesAmmount)) {
                (sharesAmmount > 0) && this.updatePrice(sharesAmmount, sharesPrice);
                this.setState({
                    transactions: [...this.state.transactions, { sharesAmmount, sharesPrice }]
                })
            }
        } else {
            console.warn("se debe agregar una alerta, que si no funciona hay que mejorar aqui")
        }

    }
    updatePrice(newShare, newPrice) {
        let addedSharesTimesPrice = newPrice * newShare;
        let addedShares = newShare;

        let transactions = this.state.transactions;
        for (var i = 0; i < transactions.length; i++) {
            addedSharesTimesPrice += transactions[i].sharesAmmount * transactions[i].sharesPrice;
            addedShares += transactions[i].sharesAmmount;
        }

        let averagePrice = this.numFormat(addedSharesTimesPrice / addedShares)
        this.setState({ averagePrice });
        this.updateValues()
    }


    updateShares(sharesAmmount) {
        let long = this.state.typeLong;
        let shares = sharesAmmount;
        let transactions = this.state.transactions;
        for (var i = 0; i < transactions.length; i++) {
            shares += transactions[i].sharesAmmount;
        }
        if (long) {
            if (shares >= 0) {
                this.setState({ shares });
                this.updateValues();
                return true
            } else {
                console.error("Para long no puedes tener numeros negativos");
                return false;
            }
        } else {
            if (shares <= 0) {
                this.setState({ shares });
                this.updateValues();
                return true
            } else {
                console.error("Para short no puedes tener numeros positivos");
                return false;
            }
        }

    }
    updateRiskReward() {
        let risk = this.state.risk;
        let reward = this.state.reward;
        let averagePrice = this.state.averagePrice;
        if (risk && reward && averagePrice) {
            let riskRewards = this.numFormat((reward - averagePrice) / (averagePrice - risk));
            this.setState({ riskRewards })
        } else {
            console.warn("Por el momento no podemos sacar el riskReward por:")
            risk == null && console.warn("No tenemos risk");
            reward == null && console.warn("No tenemos reward");
            averagePrice == null && console.warn("No tenemos averagePrice");
        }
    }
    updateLoss() {
        let risk = this.state.risk;
        let shares = this.state.shares;
        let averagePrice = this.state.averagePrice;
        if (risk && shares && averagePrice) {
            let loss = this.numFormat((averagePrice - risk) * shares);
            this.setState({ loss })
        } else {
            console.warn("Por el momento no podemos sacar el updateLoss por:")
            risk == null && console.warn("No tenemos risk");
            shares == null && console.warn("No tenemos shares");
            averagePrice == null && console.warn("No tenemos averagePrice");
        }
    }
    updateRiskPercent() {
        let risk = this.state.risk;
        let averagePrice = this.state.averagePrice;
        if (risk && averagePrice) {
            let riskPercent = this.numFormat((risk - averagePrice) * 100 / averagePrice);
            this.setState({ riskPercent })
        } else {
            console.warn("Por el momento no podemos sacar el RiskPercent por:")
            risk == null && console.warn("No tenemos risk");
            averagePrice == null && console.warn("No tenemos averagePrice");
        }
    }
    updateRewardPercent() {
        let reward = this.state.reward;
        let averagePrice = this.state.averagePrice;
        if (reward && averagePrice) {
            let rewardPercent = this.numFormat((averagePrice - reward) * 100 / averagePrice);
            this.setState({ rewardPercent })
        } else {
            console.warn("Por el momento no podemos sacar el RewardPercent por:")
            reward == null && console.warn("No tenemos reward");
            averagePrice == null && console.warn("No tenemos averagePrice");
        }
    }
    updateReferenceShare() {
        let maxLoss = this.state.maxLoss;
        let loss = this.state.loss;
        let referenceEntry = this.state.referenceEntry;
        let risk = this.state.risk;
        if (maxLoss && loss && referenceEntry && risk) {
            let referenceShare = this.numFormat((maxLoss - loss) / (referenceEntry - risk));
            this.setState({ referenceShare })
        } else {
            console.warn("Por el momento no podemos sacar el ReferenceShare por:")
            maxLoss == null && console.warn("No tenemos maxLoss");
            loss == null && console.warn("No tenemos loss");
            referenceEntry == null && console.warn("No tenemos referenceEntry");
            risk == null && console.warn("No tenemos risk");
        }
    }
    numFormat(num) {
        return num.toFixed(3)
    }

    validateNumberValue(number) {
        if (isNaN(number)) {
            console.log("1)validatenumber:aqui falla")
            return false;
        }
        return Number(number)
    }

    //Get values from diferent inputs
    getMaxSize(event) {
        let numberOrFalse = this.validateNumberValue(event.target.value)
        if (numberOrFalse) {
            this.setState({ maxSize: numberOrFalse });
            this.updateValues()
        }
    }
    getMaxLoss(event) {
        let numberOrFalse = this.validateNumberValue(event.target.value)
        if (numberOrFalse) {
            this.setState({ maxLoss: numberOrFalse });
            this.updateValues();
        }
    }
    getRisk(event) {
        let numberOrFalse = this.validateNumberValue(event.target.value)
        if (numberOrFalse) {
            this.setState({ risk: numberOrFalse });
            this.updateValues();
        }
    }
    getReward(event) {
        let numberOrFalse = this.validateNumberValue(event.target.value)
        if (numberOrFalse) {
            this.setState({ reward: numberOrFalse });
            this.updateValues();
        }
    }
    getReferenceEntry(event) {
        let numberOrFalse = this.validateNumberValue(event.target.value)
        if (numberOrFalse) {
            this.setState({ referenceEntry: numberOrFalse });
            this.updateValues();
        }
    }
    getShares(event) {
        let numberOrFalse = this.validateNumberValue(event.target.value)
        if (numberOrFalse) {
            this.setState({ shares: numberOrFalse });
            this.updateValues();
        }
    }
    //transactions
    getSharesAmmount(event) {
        console.log("event", event);
        let numberOrFalse = this.validateNumberValue(event.target.value)
        if (numberOrFalse) {
            this.setState({ sharesAmmount: numberOrFalse });
            this.updateValues();
        }
    }
    getSharesPrice(event) {
        let numberOrFalse = this.validateNumberValue(event.target.value)
        if (numberOrFalse) {
            this.setState({ sharesPrice: numberOrFalse });
            this.updateValues();
        }
    }




    handleChange(event) {
        //is used to store everytime that a key is typed in the input
        this.setState({ value: event.target.value });
    }

    onLongType() {
        //hay que quitar los valores de acciones compradas
        //cambios mas visuales cuando existan cambios aqui
        //long tiene riesgo abajo y reward arriba
        //short tiene riesgo arriba y reward abajo
        this.setState({ typeLong: true });
    }
    onShortType() {
        //hay que quitar los valores de acciones compradas
        //cambios mas visuales cuando existan cambios aqui
        //long tiene riesgo abajo y reward arriba
        //short tiene riesgo arriba y reward abajo
        this.setState({ typeLong: false });
    }

    render() {
        return (
            <div className="container">
                <div className="space"></div>
                <div className="row">
                    <div className="col-3">
                        <div className="basic-parameters grey">
                            <h3>Rules</h3>
                            <ButtonGroup aria-label="Basic example">
                                <ToggleButton type="checkbox" variant="outline-success" value={true} onClick={this.onLongType} checked={true === this.state.typeLong} >Long</ToggleButton>
                                <ToggleButton type="checkbox" variant="outline-danger" value={false} onClick={this.onShortType} checked={false === this.state.typeLong} >Short</ToggleButton>
                            </ButtonGroup>
                            <div className="space"></div>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="5">
                                    Max Size:
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" placeholder="Max Size" onChange={this.getMaxSize} />
                                </Col>
                                <Form.Label column sm="2">
                                    $
                                </Form.Label>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="5">
                                    Max Loss:
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" placeholder="Max Loss" onChange={this.getMaxLoss} />
                                </Col>
                                <Form.Label column sm="2">
                                    $
                                </Form.Label>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="5">
                                    Reward:
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" placeholder="Reward" onChange={this.getReward} />
                                </Col>
                                <Form.Label column sm="2">
                                    $/share
                                </Form.Label>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="5">
                                    Risk:
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" placeholder="Risk" onChange={this.getRisk} />
                                </Col>
                                <Form.Label column sm="2">
                                    $/share
                                </Form.Label>
                            </Form.Group>
                            <hr />
                            <div className="space"></div>
                            <hr />
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="5">
                                    Reference entry:
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" placeholder="Reference entry" onChange={this.getReferenceEntry} />
                                </Col>
                                <Form.Label column sm="2">
                                    $/share
                                </Form.Label>
                            </Form.Group>
                            <hr />
                        </div>


                    </div>





                    <div className="col-10 grey">

                    </div>
                    <div className="col-5">
                        <div className="container">
                            <div className="register-parameters">


                                {/* Init of table */}
                                {(this.state.transactions.length > 0) &&



                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Ammount of shares</th>
                                                <th>Share Price</th>

                                            </tr>
                                        </thead>
                                        <tbody>


                                            {this.state.transactions.map(function (item, i) {

                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>

                                                        <td>{item?.sharesAmmount}</td>
                                                        <td>{item?.sharesPrice}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                }
                                <Form.Group as={Row} className="mb-12" >
                                    <Form.Label column sm="3">
                                        Shares in/out
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control type="number" placeholder="" onChange={this.getSharesAmmount} />
                                    </Col>
                                    <Form.Label column sm="3">
                                        Shares price
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control type="number" placeholder="" onChange={this.getSharesPrice} />
                                    </Col>
                                </Form.Group>
                                <div className="space"></div>
                                <Button variant="primary" onClick={this.excuteTransaction}>Add Transaction</Button>
                            </div>
                        </div>
                    </div>
                    {/* Acomodar posiciones de cajas */}

                    <div className="col-4">

                        <p>Average Price:{this.state.averagePrice}</p>
                        <p>Shares: {this.state.shares}</p>
                        <br />
                        <p>Risk Reward: {this.state.riskRewards}</p>
                        <p>Loss:{this.state.loss}</p>
                        <p>Risk%:{this.state.riskPercent}</p>
                        <p>Reward%:{this.state.rewardPercent}</p>


                        <p>Reference shares:{this.state.referenceShare}</p>
                    </div>
                </div>
                <Button variant="dark" onClick={this.checkState}>Check State</Button>
                {/* <Button variant="dark" onClick={this.updateRiskReward}>update</Button> */}
            </div>
        );
    }
}
export default PostionSizing;