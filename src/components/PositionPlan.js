import React from 'react'
import { Row, Col } from 'react-bootstrap';
import PlanningInput from './PlanningInput';
import PlanningResults from './PlanningResults';
import { useTranslation } from 'react-i18next';

const PLANNING_RESULT_TITLE = "Plan results"
const PLANNING_TITLE = "Plan"

export default function PositionPlan({ positionPlanObj }) {
    const { t } = useTranslation();
    const planningInput = positionPlanObj.planningInput;
    const planningResults = positionPlanObj.planningResults;
    planningResults.title = t(PLANNING_RESULT_TITLE);
    return (
        <div className="box">
            <h5>{t(PLANNING_TITLE)}</h5>
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
