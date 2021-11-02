import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';

export default function PositionPlanOutputPercent({ data }) {
    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="4">
                {data.name}
            </Form.Label>
            <Col xs="4">

                <InputGroup>
                    <Form.Control type="number" defaultValue={data.dolars} readOnly />
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup>
            </Col>
            <Col xs="4">
                <InputGroup>
                    <Form.Control type="number" defaultValue={data.percent} readOnly />
                    <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
