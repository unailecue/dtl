
import React, { useRef } from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";
import { Trans } from 'react-i18next';
const TITLE = <Trans>Plan</Trans>
const REFERENCE_ENTRY_NAME = <Trans>Reference Entry</Trans>
const REFERENCE_SHARES_NAME = <Trans>Reference Shares</Trans>

export default function PlanningInput({ planningInput }) {
    const refEntry = useRef()
    const referenceShare = planningInput.referenceSharesObj.referenceShare;

    function handleChangeRefenceEntry(e) {
        planningInput.referenceEntryObj.setState(parseFloat(refEntry.current.value));
    }
    return (
        <div className="personal-box-shadow">
            <h5>
                {TITLE}
            </h5>
            <Row>
                <Col sm="6">
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column xs="12">
                            {REFERENCE_ENTRY_NAME}
                        </Form.Label>
                        <Col xs="12">
                            <InputGroup>
                                <Form.Control type="number" ref={refEntry} onChange={handleChangeRefenceEntry} />
                                <InputGroup.Text> $/sh</InputGroup.Text>
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
