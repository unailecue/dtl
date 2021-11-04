import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';
import AddExecution from './AddExecution';
import ExecutionResult from './ExecutionResult';
const LOCAL_STORAGE = "storage.executedvalues";

export default function PositionExecute() {
    const [Executed, setExecuted] = useState([]);
    useEffect(() => {
        const storedExecuted = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
        if (storedExecuted) setExecuted(storedExecuted);
    }, []);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE, JSON.stringify(Executed))
    }, [Executed])

    function ChangeStoredExecute(id, shares, price) {
        const newExecuted = [...Executed];
        const Execute = newExecuted.find(x => x.id === id);
        Execute.shares = shares;
        Execute.price = price;

        setExecuted(newExecuted);

    }
    return (
        <div className="box">
            <h5>Execute</h5>
            <Row>
                <Col>
                    <Row>
                        <AddExecution executed={Executed} setExecuted={setExecuted} />
                    </Row>
                    <Row>
                        <ExecutionResult executed={Executed} changeStoredExecute={ChangeStoredExecute} />
                    </Row>
                </Col>
                <Col>
                    <Row className="container">
                        <div className="personal-box-shadow">
                            {/* <AddExecution /> */}
                        </div>
                    </Row>
                    <Row className="container">
                        <div className="personal-box-shadow">
                            {/* <AddExecution /> */}
                        </div>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}
