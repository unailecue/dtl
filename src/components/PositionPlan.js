import React, { useRef, useState } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';
import PlanningInput from './PlanningInput';
import PlanningResults from './PlanningResults';

export default function PositionPlan({ positionPlan }) {
    function handleChange(e) {
        console.log("handling")
    }

    const planningResults = positionPlan.planningResults;
    return (
        <div className="box">
            <Row>
                <Col sm="6">
                    <PlanningInput />
                </Col>
                <Col sm="6">
                    <PlanningResults planningResults={planningResults} />
                </Col>
            </Row>

        </div>
    )
}
