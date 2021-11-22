
import React from 'react'
import { Row, Col } from 'react-bootstrap';
import PositionPlanOutput from './PositionPlanOutput';
import PositionPlanOutputPercent from './PositionPlanOutputPercent';

export default function PlanningResults({ planningResults }) {

    const title = planningResults.title;
    const averagePrice = planningResults.averagePrice;
    const sharesTotals = planningResults.sharesTotals;
    const sizeAvgPrice = planningResults.sizeAvgPrice;
    const plannedReward = planningResults.plannedReward;
    const plannedLoss = planningResults.plannedLoss;

    const relationRiskReward = planningResults.relationRiskReward;


    return (
        <>
            <div className="personal-box-shadow">
                <h5>
                    {title}
                </h5>
                <Row>
                    <Col sm="12">
                        <PositionPlanOutput data={averagePrice} />
                    </Col>
                    <Col sm="12">
                        <PositionPlanOutput data={sharesTotals} />
                    </Col>
                    <Col sm="12">
                        <PositionPlanOutput data={sizeAvgPrice} />
                    </Col>
                    <Col sm="12">
                        <PositionPlanOutputPercent data={plannedReward} />
                    </Col>
                    <Col sm="12">
                        <PositionPlanOutputPercent data={plannedLoss} />
                    </Col>

                </Row>


            </div>
            <div className="personal-box-shadow">
                <Col sm="12">
                    <PositionPlanOutput data={relationRiskReward} />
                </Col>
            </div>
        </>

    )
}
