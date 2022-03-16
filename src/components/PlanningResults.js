
import React from 'react'
import { Row, Col } from 'react-bootstrap';
import PositionPlanOutput from './PositionPlanOutput';
import PositionPlanOutputPercent from './PositionPlanOutputPercent';
import { useTranslation } from 'react-i18next';

const AVERAGE_PRICE = { name: "Average price", onlyDolarSymbol: "$/sh", roudedToDecimals: 2 };
const SHARES_TOTAL = { name: "Total shares", onlyDolarSymbol: "Sh", roudedToDecimals: 0 };
const SIZE_AVERAGE_PRICE = { name: "Size", onlyDolarSymbol: "$", roudedToDecimals: 2 };
const PLANNED_REWARD = { name: "Planned Reward", onlyDolarSymbol: "$" };
const PLANNED_LOSS = { name: "Planned Loss", onlyDolarSymbol: false };
const RELATION_RISK_REWARD = { name: "Risk Reward", onlyDolarSymbol: ":1", roudedToDecimals: 1 };

export default function PlanningResults({ planningResults }) {
    const { t } = useTranslation();

    const title = planningResults.title;
    const averagePrice = { ...planningResults.averagePriceObj, ...AVERAGE_PRICE };
    const sharesTotals = { ...planningResults.sharesTotalsObj, ...SHARES_TOTAL };
    const sizeAvgPrice = { ...planningResults.sizeAvgPriceObj, ...SIZE_AVERAGE_PRICE };
    const plannedReward = { ...planningResults.plannedRewardObj, ...PLANNED_REWARD };
    const plannedLoss = { ...planningResults.plannedLossObj, ...PLANNED_LOSS };

    const relationRiskReward = { ...planningResults.relationRiskRewardObj, ...RELATION_RISK_REWARD };

    return (
        <>
            <div className="personal-box-shadow">
                <h5>
                    {t(title)}
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
