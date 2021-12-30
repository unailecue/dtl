import React, { useRef, useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";
import { Trans } from 'react-i18next';
const CERO_VALIDATION = <Trans>0 is not a valid number for rules</Trans>

export default function PositionRulesInput({ data }) {
    const ref = useRef()
    const [validated, setvalidated] = useState(false)

    function handleChange(e) {
        let value = (utils.abs(ref.current.value))
        value === 0 ? setvalidated(true) : setvalidated(false)
        if (parseFloat(ref.current.value) != value) ref.current.value = value
        data.setState(parseFloat(value));
    }
    //*If value is errased remove the visual input value
    useEffect(() => {
        ref.current.value = data.value;
    }, [data.value]);

    return (
        <Form.Group noValidate as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="12">
                {data.name}
            </Form.Label>
            <Col xs="12">
                <InputGroup >
                    <Form.Control type="number" ref={ref} onChange={handleChange} defaultValue={data.value} isInvalid={validated} />
                    <InputGroup.Text>    {data.onlyDolarSymbol ? "$" : "$/sh"}</InputGroup.Text>
                    <Form.Control.Feedback type="invalid">{CERO_VALIDATION}</Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
