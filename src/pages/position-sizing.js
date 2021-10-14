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
            transactions: [{ sharesAmmount: 100, sharesPrice: 3.9 }]
            //   
        };


        //Here we handle the bind, avoiding the use on the HTML
        this.handleChange = this.handleChange.bind(this);
        this.checkState = this.checkState.bind(this);

        this.onLongType = this.onLongType.bind(this);
        this.onShortType = this.onShortType.bind(this);

        //inputs
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




    }
    checkState(event) {
        console.log(this.state);
    }
    updateValues() {
        console.log("updatevalues");
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

        console.log({ addedSharesTimesPrice });
        console.log({ addedShares });
        let averagePrice = this.numFormat(addedSharesTimesPrice / addedShares)
        this.setState({ averagePrice })


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
                this.setState({ shares })
                return true
            } else {
                console.warn("Para long no puedes tener numeros negativos");
                return false;
            }
        } else {
            if (shares <= 0) {
                this.setState({ shares })
                return true
            } else {
                console.warn("Para short no puedes tener numeros positivos");
                return false;
            }
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
        this.setState({ typeLong: true });
    }
    onShortType() {
        this.setState({ typeLong: false });
    }

    render() {
        return (
            <div className="container">
                <div className="space"></div>
                <div className="row">
                    <div className="col-3">
                        <div className="basic-parameters">
                            <ButtonGroup aria-label="Basic example">
                                <ToggleButton type="checkbox" variant="outline-success" value={true} onClick={this.onLongType} checked={true === this.state.typeLong} >Long</ToggleButton>
                                <ToggleButton type="checkbox" variant="outline-danger" value={false} onClick={this.onShortType} checked={false === this.state.typeLong} >Short</ToggleButton>
                            </ButtonGroup>
                            <div className="space"></div>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="6">
                                    Max Size:
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="number" placeholder="Max Size" onChange={this.getMaxSize} />
                                </Col>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="6">
                                    Max Loss:
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="number" placeholder="Max Loss" onChange={this.getMaxLoss} />
                                </Col>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="6">
                                    Risk:
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="number" placeholder="Risk" onChange={this.getRisk} />
                                </Col>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="6">
                                    Reward:
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="number" placeholder="Reward" onChange={this.getReward} />
                                </Col>
                            </Form.Group>
                            <hr />
                            <div className="space"></div>
                            <hr />
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="6">
                                    Reference entry:
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="number" placeholder="Reference entry" onChange={this.getReferenceEntry} />
                                </Col>
                            </Form.Group>
                            <hr />
                        </div>


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




                                {/* {

                                    console.log("transactions", this.state.transactions),


                                    this.state.transactions.map(function (item, i) {
                                        console.log('test');
                                        return (


                                            <Row key={i}>
                                                <Col sm="6">{item?.sharesAmmount}</Col>
                                                <Col sm="6">{item?.sharesPrice}</Col>
                                            </Row>
                                        )
                                    })
                                } */}

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


                    <div className="col-4">

                        <p>Average Price:{this.state.averagePrice}</p>
                        <p>Shares: {this.state.shares}</p>
                        <p>Risk Reward: {this.state.riskRewards}</p>
                        <p>Loss:{this.state.loss}</p>
                        <p>Risk%:{this.state.riskPercent}</p>
                        <p>Reward%:{this.state.rewardPercent}</p>


                        <p>Reference shares:</p>
                    </div>
                </div>
                <Button variant="dark" onClick={this.checkState}>Check State</Button>
            </div>
        );
    }
}
export default PostionSizing;