import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';
import { v4 as uniqueId } from "uuid";

export default function PositionRulesInput({ data }) {
    const ref = useRef()

    function handleChange(e) {

        data.setState(ref.current.value)
    }

    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="4">
                {data.name}
            </Form.Label>
            <Col xs="6">
                <Form.Control type="number" ref={ref} onChange={handleChange} />
            </Col>
            <Form.Label column xs="1">
                {data.onlyDolarSymbol ? "$" : "$/share"}
            </Form.Label>
        </Form.Group>
    )
}
