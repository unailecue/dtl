

import React from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as utils from "../utils/utils";

export default function PositionPlanOutput({ data }) {
    const { t } = useTranslation();
    const roundedNumber = !isNaN(data.roudedToDecimals) ? utils.roundBy(data.val, data.roudedToDecimals) : utils.roundShares(data.val)
    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="5">
                {t(data.name)}
            </Form.Label>
            <Col xs="7">
                <InputGroup>
                    <Form.Control type="number" value={roundedNumber || 0} readOnly />
                    <InputGroup.Text> {data.onlyDolarSymbol}</InputGroup.Text>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
