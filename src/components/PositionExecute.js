import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';
import AddExecution from './AddExecution';
import ExecutionResult from './ExecutionResult';

export default function PositionExecute({ positionExecute }) {

    const addExecution = positionExecute.addExecution;
    const executionResult = positionExecute.executionResult;
    const executed = positionExecute.executed;
    const setExecuted = positionExecute.setExecuted;
    const changeStoredExecute = positionExecute.changeStoredExecute;
    return (
        <div className="box">
            <h5>Execute</h5>
            <Row>
                <Col>
                    <Row>
                        <AddExecution addExecution={addExecution} executed={executed} setExecuted={setExecuted} />
                    </Row>
                    <Row>
                        <ExecutionResult executionResult={executionResult} executed={executed} changeStoredExecute={changeStoredExecute} />
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <div className="personal-box-shadow">
                        </div>
                    </Row>
                    <Row >
                        <div className="personal-box-shadow">
                        </div>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}
