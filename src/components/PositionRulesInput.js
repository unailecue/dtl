import React, { useRef } from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";

export default function PositionRulesInput({ data }) {
    const ref = useRef()

    function handleChange(e) {
        let value = (utils.abs(ref.current.value))
        ref.current.value = value
        data.setState(parseFloat(value));
    }

    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="12">
                {data.name}
            </Form.Label>
            <Col xs="12">
                <InputGroup>
                    <Form.Control type="number" ref={ref} onChange={handleChange} defaultValue={data.value} />
                    <InputGroup.Text>    {data.onlyDolarSymbol ? "$" : "$/sh"}</InputGroup.Text>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
