import React, { useRef, useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";
import { useTranslation } from 'react-i18next';
const CERO_VALIDATION = "0 is not a valid number for rules"

export default function PositionRulesInput({ data }) {
    const ref = useRef()
    const { t } = useTranslation();
    const [validated, setvalidated] = useState(false)

    function handleChange(e) {
        let value = (utils.abs(ref.current.value))
        value === 0 ? setvalidated(true) : setvalidated(false)
        if (parseFloat(ref.current.value) != value) ref.current.value = value
        data.setState(parseFloat(value));
    }

    useEffect(() => { //*If value is errased remove the visual input value
        ref.current.value = data.value;
    }, [data.value]);

    return (
        <Form.Group noValidate as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="12">
                {t(data.name)}
            </Form.Label>
            <Col xs="12">
                <InputGroup >
                    <Form.Control type="number" ref={ref} onChange={handleChange} defaultValue={data.value} isInvalid={validated} />
                    <InputGroup.Text>    {data.onlyDolarSymbol ? "$" : "$/sh"}</InputGroup.Text>
                    <Form.Control.Feedback type="invalid">{t(CERO_VALIDATION)}</Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
