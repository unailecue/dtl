import React, { useRef, useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";
import { useTranslation } from 'react-i18next';
const CERO_VALIDATION = "0 is not a valid number for rules"

export default function PositionRulesInput({ data }) {
    const ref = useRef()
    const { t } = useTranslation();
    const [validated, setvalidated] = useState(false)
    const [prevValue, setPrevValue] = useState()

    function handleChange(e) {
        let currentValue = ref.current.value;
        if (currentValue === "") return setPrevValue(""); //if there is no value return
        if (isNaN(currentValue)) { //if is not a number check what is happening
            //the separator is not the problem, we dont allow this char
            if (currentValue.indexOf(".") === -1 && currentValue.indexOf(",") === -1) return resetToPrevValue()
            //Prev number already has decimals?
            if (prevValue % 1 != 0) return resetToPrevValue()
            //return the same prev num
            const dotForced = utils.forceDot(currentValue);
            const colonForced = utils.forceColon(currentValue);
            if (isNaN(dotForced) && isNaN(colonForced)) {//we check if there is no convertion valid
                console.error("We could not parse any of the values to a real number");
                console.error("dot forced", dotForced);
                console.error("colon forced", colonForced);
                return
            }
            if (!isNaN(colonForced)) { //Validation of which will work
                currentValue = colonForced;
            } else {
                currentValue = dotForced;
            }
        }

        let value = (utils.abs(currentValue))
        value === 0 ? setvalidated(true) : setvalidated(false)
        if (parseFloat(currentValue) != value) ref.current.value = value
        data.setState(parseFloat(value));
        setPrevValue(parseFloat(value))
    }
    function resetToPrevValue() {
        ref.current.value = prevValue ? prevValue : ""
    }

    useEffect(() => { //If value is errased remove the visual input value
        ref.current.value = data.value;
    }, [data.value]);

    return (
        <Form.Group noValidate as={Row} className="mb-3 align-items-center">
            <Form.Label column xs="12">
                {t(data.name)}
            </Form.Label>
            <Col xs="12">
                <InputGroup >
                    <Form.Control type="" ref={ref} onChange={handleChange} defaultValue={data.value} isInvalid={validated} />
                    <InputGroup.Text>    {data.onlyDolarSymbol ? "$" : "$/sh"}</InputGroup.Text>
                    <Form.Control.Feedback type="invalid">{t(CERO_VALIDATION)}</Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}
