import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';
import PositionRules from '../components/PositionRules';
import PositionPlan from '../components/PositionPlan';
import PositionExecute from '../components/PositionExecute';
export default function PositionSizing() {

    //Variables and Hooks for important data
    const [isLong, setIsLongChange] = useState(true);
    const [MaxSize, setMaxSize] = useState();
    const [MaxLoss, setMaxLoss] = useState();
    const [Reward, setReward] = useState();
    const [Risk, setRisk] = useState();

    const [AvergaPrice, setAvergaPrice] = useState(1);
    const [SharesTotals, setSharesTotals] = useState(2);
    const [SizeAvgPrice, setSizeAvgPrice] = useState(3);
    const [PlannedReward, setPlannedReward] = useState(4);
    const [PlannedLoss, setPlannedLoss] = useState(5);
    const [PlannedRewardPerc, setPlannedRewardPerc] = useState(46);
    const [PlannedLossPerc, setPlannedLossPerc] = useState(50);
    const [RelationRiskReward, setRelationRiskReward] = useState(5);

    //Object construction
    const PositionTypeObj = { name: "Position Type", islong: isLong, setState: setIsLongChange, nameShortValue: "Short", nameLongValue: "Long" };
    const MaxSizeObj = { name: "Max Size", onlyDolarSymbol: true, setState: setMaxSize };
    const MaxLossOBJ = { name: "Max Loss", onlyDolarSymbol: true, setState: setMaxLoss };
    const RewardOBJ = { name: "Reward", onlyDolarSymbol: false, setState: setReward };
    const RiskOBJ = { name: "Risk", onlyDolarSymbol: false, setState: setRisk };

    const averagePrice = { name: "Average price", onlyDolarSymbol: "$/sh", val: AvergaPrice };
    const sharesTotals = { name: "SharesTotals", onlyDolarSymbol: "Sh", val: SharesTotals };
    const sizeAvgPrice = { name: "SizeAvgPrice", onlyDolarSymbol: "$", val: SizeAvgPrice };
    const plannedReward = { name: "PlannedReward", onlyDolarSymbol: "$", dolars: PlannedReward, percent: PlannedRewardPerc };
    const plannedLoss = { name: "PlannedLoss", onlyDolarSymbol: false, dolars: PlannedLoss, percent: PlannedLossPerc };

    const relationRiskReward = { name: "RelationRiskReward", onlyDolarSymbol: ":1", val: RelationRiskReward };


    //Unify objects by component
    const positionRules = { MaxSize: MaxSizeObj, PositionType: PositionTypeObj, MaxLoss: MaxLossOBJ, Reward: RewardOBJ, Risk: RiskOBJ }
    const positionPlan = {
        planningResults: {
            averagePrice: averagePrice,
            sharesTotals: sharesTotals,
            sizeAvgPrice: sizeAvgPrice,
            plannedReward: plannedReward,
            plannedLoss: plannedLoss,
            relationRiskReward: relationRiskReward
        }
    }

    //Example of useEffect
    useEffect(() => {

        console.log("Execute formulas validations", { MaxSize })
        console.log("Execute formulas validations", { MaxLoss })
        console.log("Execute formulas validations", { Reward })


    }, [MaxLoss, isLong, MaxSize, Risk, Reward])
    return (
        <Container>
            <Row>
                <Col md="3">
                    <PositionRules positionRules={positionRules} />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <PositionPlan positionPlan={positionPlan} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PositionExecute />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
