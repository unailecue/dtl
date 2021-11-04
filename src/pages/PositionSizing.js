import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';
import PositionRules from '../components/PositionRules';
import PositionPlan from '../components/PositionPlan';
import PositionExecute from '../components/PositionExecute';
import { Trans } from 'react-i18next';

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
    const PositionTypeObj = { name: <Trans>Position Type</Trans>, islong: isLong, setState: setIsLongChange, nameShortValue: <Trans>Short</Trans>, nameLongValue: <Trans>Long</Trans> };
    const MaxSizeObj = { name: <Trans>Max Size</Trans>, onlyDolarSymbol: true, setState: setMaxSize };
    const MaxLossOBJ = { name: <Trans>Max Loss</Trans>, onlyDolarSymbol: true, setState: setMaxLoss };
    const RewardOBJ = { name: <Trans>Planned reward level</Trans>, onlyDolarSymbol: false, setState: setReward };
    const RiskOBJ = { name: <Trans>Planned risk level</Trans>, onlyDolarSymbol: false, setState: setRisk };

    const averagePrice = { name: <Trans>Average price</Trans>, onlyDolarSymbol: "$/sh", val: AvergaPrice };
    const sharesTotals = { name: <Trans>Total shares</Trans>, onlyDolarSymbol: "Sh", val: SharesTotals };
    const sizeAvgPrice = { name: <Trans>Average Price</Trans>, onlyDolarSymbol: "$", val: SizeAvgPrice };
    const plannedReward = { name: <Trans>Planned Reward</Trans>, onlyDolarSymbol: "$", dolars: PlannedReward, percent: PlannedRewardPerc };
    const plannedLoss = { name: <Trans>Planned Loss</Trans>, onlyDolarSymbol: false, dolars: PlannedLoss, percent: PlannedLossPerc };
    const relationRiskReward = { name: <Trans>Risk Reward</Trans>, onlyDolarSymbol: ":1", val: RelationRiskReward };


    const referenceEntry = { name: <Trans>Reference Entry</Trans>, setState: setReferenceEntry };
    const referenceShares = { name: <Trans>Reference Shares</Trans>, setState: setReferenceShares };




    //Unify objects by component
    const positionRules = { title: <Trans>Rules</Trans>, MaxSize: MaxSizeObj, PositionType: PositionTypeObj, MaxLoss: MaxLossOBJ, Reward: RewardOBJ, Risk: RiskOBJ }
    const positionPlan = {
        planningResults: {
            title: <Trans>Plan results</Trans>,
            averagePrice: averagePrice,
            sharesTotals: sharesTotals,
            sizeAvgPrice: sizeAvgPrice,
            plannedReward: plannedReward,
            plannedLoss: plannedLoss,
            relationRiskReward: relationRiskReward
        },
        planningInput: {
            title: <Trans>Plan</Trans>,
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
