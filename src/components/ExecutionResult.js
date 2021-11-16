import React, { useState } from 'react'

import ExecutionValue from './ExecutionValue'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';


export default function ExecutionResult({ executionResult, executed, changeStoredExecute, buyButton, sellButton, typeValues }) {
    const title = executionResult.title
    const sharesLabel = executionResult.sharesLabel;
    const priceLabel = executionResult.priceLabel;
    return (
        <div>

            <div className="personal-box-shadow">
                <h5>
                    {title}
                </h5>
                <Row>
                    <Col className="mb-3 align-items-center">
                        {priceLabel}
                    </Col>
                    <Col className="mb-3 align-items-center">
                        {sharesLabel}
                    </Col>
                    <Col className="mb-3 align-items-center">
                    </Col>
                    {executed.length === 0 ? <div>Waiting for executions ...</div>
                        : executed.map((values) => {
                            return <ExecutionValue executionResult={executionResult} values={values} key={values.id} changeStoredExecute={changeStoredExecute} typeValues={typeValues} />
                        })}
                </Row>
            </div>
        </div>
    )
}
