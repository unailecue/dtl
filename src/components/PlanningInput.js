
import React, { useRef, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";
import { Trans } from 'react-i18next';

const TITLE = <Trans>Plan</Trans>
const REFERENCE_ENTRY_NAME = <Trans>Reference Entry</Trans>
const REFERENCE_SHARES_NAME = <Trans>Reference Shares</Trans>
const RISK_REWARD_VALIDATION = <Trans>The reference value should be between reward level and risk level</Trans>

export default function PlanningInput({ planningInput }) {
    const refEntry = useRef()
    const referenceShare = planningInput.referenceSharesObj.referenceShare;
    const invalidValue = planningInput.invalidValueReferenceEntry;
    const isLong = planningInput.isLong;

    useEffect(() => { //*Effect used to delete current value when type is changed
        refEntry.current.value = null;
    }, [isLong]);

    function handleChangeRefenceEntry(e) {
        let val = refEntry.current.value;
        if (val < 0) {
            val = utils.abs(val);
            refEntry.current.value = val
        }
        if (val === '') return planningInput.referenceEntryObj.setState(0);
        planningInput.referenceEntryObj.setState((val));
    }
    return (
        <div className="personal-box-shadow">
            <h5>{TITLE}</h5>
            <Row>
                <Col sm="6">
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column xs="12">
                            {REFERENCE_ENTRY_NAME}
                        </Form.Label>
                        <Col xs="12">
                            <InputGroup>
                                <Form.Control type="number" ref={refEntry} onChange={handleChangeRefenceEntry} isInvalid={invalidValue} />
                                <InputGroup.Text> $/sh</InputGroup.Text>
                                <Form.Control.Feedback type="invalid">{RISK_REWARD_VALIDATION}</Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column xs="12">
                            {REFERENCE_SHARES_NAME}
                        </Form.Label>
                        <Col xs="12">
                            <InputGroup>
                                <Form.Control type="number" readOnly value={referenceShare} />
                                <InputGroup.Text> sh</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    )
}
