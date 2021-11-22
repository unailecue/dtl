

import React from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";


export default function PositionPlanOutput({ data }) {
    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="5">
                {data.name}
            </Form.Label>
            <Col xs="7">
                <InputGroup>
                    <Form.Control type="number" value={utils.roundShares(data.val) || 0} readOnly />
                    <InputGroup.Text> {data.onlyDolarSymbol}</InputGroup.Text>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
