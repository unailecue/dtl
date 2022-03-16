import React from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as utils from "../utils/utils";


export default function PositionPlanOutputPercent({ data }) {
    const { t } = useTranslation();
    return (
        <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="4" xs="12">
                {t(data.name)}
            </Form.Label>
            <Col sm="4" xs="6">
                <InputGroup>
                    <Form.Control type="number" value={utils.roundPrice(data.dolars) || 0} readOnly />
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup>
            </Col>
            <Col sm="4" xs="6">
                <InputGroup>
                    <Form.Control type="number" value={utils.roundPercent(data.percent) || 0} readOnly />
                    <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
