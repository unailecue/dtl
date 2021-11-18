import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';


export default function PositionRulesInput({ data }) {
    const ref = useRef()

    function handleChange(e) {

        data.setState(parseFloat(ref.current.value));
    }

    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="12">
                {data.name}
            </Form.Label>
            <Col xs="12">
                <InputGroup>
                    <Form.Control type="number" ref={ref} onChange={handleChange} />
                    <InputGroup.Text>    {data.onlyDolarSymbol ? "$" : "$/sh"}</InputGroup.Text>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
