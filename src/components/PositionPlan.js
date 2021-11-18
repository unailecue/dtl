import React from 'react'
import { Row, Col } from 'react-bootstrap';
import PlanningInput from './PlanningInput';
import PlanningResults from './PlanningResults';

export default function PositionPlan({ positionPlan }) {
    const planningResults = positionPlan.planningResults;
    const planningInput = positionPlan.planningInput;
    return (
        <div className="box">
            <Row>
                <Col sm="6">
                    <PlanningInput planningInput={planningInput} />
                </Col>
                <Col sm="6">
                    <PlanningResults planningResults={planningResults} />
                </Col>
            </Row>

        </div>
    )
}
