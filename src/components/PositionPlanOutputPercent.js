import React from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";


export default function PositionPlanOutputPercent({ data }) {
    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="4">
                {data.name}
            </Form.Label>
            <Col xs="4">

                <InputGroup>
                    <Form.Control type="number" value={utils.roundPrice(data.dolars) || 0} readOnly />
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup>
            </Col>
            <Col xs="4">
                <InputGroup>
                    <Form.Control type="number" value={utils.roundPercent(data.percent) || 0} readOnly />
                    <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
