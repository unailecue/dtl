
import React, { useRef, useState } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';


export default function PlanningInput({ planningInput }) {
    const refEntry = useRef()
    const refShare = useRef()

    function handleChangeRefenceEntry(e) {
        planningInput.referenceEntry.setState(refEntry.current.value);
    }
    function handleChangeRefenceShares(e) {
        planningInput.referenceShares.setState(refShare.current.value);
    }
    return (
        <div className="personal-box-shadow">
            <h5>
                Plan
            </h5>
            <Row>
                <Col sm="6">
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column xs="6">
                            {planningInput.referenceEntry.name || "planningInput.referenceEntry.name"}
                        </Form.Label>
                        <Col xs="6">
                            <InputGroup>

                                <Form.Control type="number" ref={refEntry} onChange={handleChangeRefenceEntry} />
                                <InputGroup.Text> $/sh</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column xs="6">
                            {planningInput.referenceShares.name || "planningInput.referenceEntry.name"}
                        </Form.Label>
                        <Col xs="6">
                            <InputGroup>

                                <Form.Control type="number" ref={refShare} onChange={handleChangeRefenceShares} />
                                <InputGroup.Text> sh</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    )
}
