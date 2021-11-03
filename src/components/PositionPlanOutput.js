

import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';


export default function PositionPlanOutput({ data }) {
    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="5">
                {data.name}
            </Form.Label>
            <Col xs="7">
                <InputGroup>
                    <Form.Control type="number" value={data.val || 0} readOnly />
                    <InputGroup.Text> {data.onlyDolarSymbol}</InputGroup.Text>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
