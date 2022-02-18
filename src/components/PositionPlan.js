import React from 'react'
import { Row, Col } from 'react-bootstrap';
import PlanningInput from './PlanningInput';
import PlanningResults from './PlanningResults';
import { Trans } from 'react-i18next';
const PLANNING_RESULT_TITLE = <Trans>Plan results</Trans>

export default function PositionPlan({ positionPlanObj }) {
    const planningInput = positionPlanObj.planningInput;
    const planningResults = positionPlanObj.planningResults;
    planningResults.title = PLANNING_RESULT_TITLE;
    return (
        <div className="box">
            <h5>Plan</h5>
            <Row>
                <Col sm="6" lg="12" xl="6">
                    <PlanningInput planningInput={planningInput} />
                </Col>
                <Col sm="6"
                    lg={{ order: 'first', span: 12 }}
                    xl={{ order: 'last', span: 6 }}>
                    <PlanningResults planningResults={planningResults} />
                </Col>
            </Row>
        </div>
    )
}
