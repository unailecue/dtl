
import React, { useRef, useState } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';


export default function PlanningInput({ planningInput }) {

    const [ReferenceEntry, setReferenceEntry] = useState();
    const [ReferenceShare, setReferenceShare] = useState();
    function handleChange(e) {
        console.log("handling")
    }
    const ref = useRef()
    return (
        <div className="personal-box-shadow">
            <h5>
                Planification
            </h5>
            <Row>
                <Col sm="6">
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column xs="6">
                            Reference Input
                        </Form.Label>
                        <Col xs="6">
                            <Form.Control type="number" ref={ref} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column xs="6">
                            Reference Input
                        </Form.Label>
                        <Col xs="6">
                            <Form.Control type="number" ref={ref} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>


        </div>
    )
}
