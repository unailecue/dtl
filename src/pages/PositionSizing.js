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

    const [AvergaPrice, setAvergaPrice] = useState();
    const [SharesTotals, setSharesTotals] = useState();
    const [SizeAvgPrice, setSizeAvgPrice] = useState();
    const [PlannedReward, setPlannedReward] = useState();
    const [PlannedLoss, setPlannedLoss] = useState();
    const [PlannedRewardPerc, setPlannedRewardPerc] = useState();
    const [PlannedLossPerc, setPlannedLossPerc] = useState();
    const [RelationRiskReward, setRelationRiskReward] = useState();

    const [ReferenceEntry, setReferenceEntry] = useState();
    const [ReferenceShares, setReferenceShares] = useState();

    //Object construction
    const PositionTypeObj = { name: "Position Type", islong: isLong, setState: setIsLongChange, nameShortValue: "Short", nameLongValue: "Long" };
    const MaxSizeObj = { name: "Max Size", onlyDolarSymbol: true, setState: setMaxSize };
    const MaxLossOBJ = { name: "Max Loss", onlyDolarSymbol: true, setState: setMaxLoss };
    const RewardOBJ = { name: "Reward", onlyDolarSymbol: false, setState: setReward };
    const RiskOBJ = { name: "Risk", onlyDolarSymbol: false, setState: setRisk };

    const averagePrice = { name: "Average price", onlyDolarSymbol: "$/sh", val: AvergaPrice };
    const sharesTotals = { name: "Shares Totals", onlyDolarSymbol: "Sh", val: SharesTotals };
    const sizeAvgPrice = { name: "Size Avg Price", onlyDolarSymbol: "$", val: SizeAvgPrice };
    const plannedReward = { name: "Planned Reward", onlyDolarSymbol: "$", dolars: PlannedReward, percent: PlannedRewardPerc };
    const plannedLoss = { name: "Planned Loss", onlyDolarSymbol: false, dolars: PlannedLoss, percent: PlannedLossPerc };
    const relationRiskReward = { name: "Relation Risk Reward", onlyDolarSymbol: ":1", val: RelationRiskReward };


    const referenceEntry = { name: "Reference Entry", setState: setReferenceEntry };
    const referenceShares = { name: " Reference Shares", setState: setReferenceShares };




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
        },
        planningInput: {
            referenceEntry: referenceEntry,
            referenceShares: referenceShares
        }
    }

    //Example of useEffect
    useEffect(() => {

        // console.log("Execute formulas validations", { MaxSize })
        // console.log("Execute formulas validations", { MaxLoss })
        // console.log("Execute formulas validations", { Reward })

    }, [MaxLoss, isLong, MaxSize, Risk, Reward])
    useEffect(() => {

        // console.log("Execute formulas validations", { MaxSize })
        // console.log("Execute formulas validations", { MaxLoss })
        // console.log("Execute formulas validations", { Reward })
        console.log({ ReferenceEntry })
        console.log({ ReferenceShares })
        console.log({ averagePrice })


    }, [ReferenceEntry, ReferenceShares])
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
