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

    //Object construction
    const PositionTypeObj = { name: "Position Type", islong: isLong, setState: setIsLongChange, nameShortValue: "Short", nameLongValue: "Long" };
    const MaxSizeObj = { name: "Max Size", onlyDolarSymbol: true, setState: setMaxSize };
    const MaxLossOBJ = { name: "Max Loss", onlyDolarSymbol: true, setState: setMaxLoss };
    const RewardOBJ = { name: "Reward", onlyDolarSymbol: false, setState: setReward };
    const RiskOBJ = { name: "Risk", onlyDolarSymbol: false, setState: setRisk };

    //Unify objects by component
    const positionRules = { MaxSize: MaxSizeObj, PositionType: PositionTypeObj, MaxLoss: MaxLossOBJ, Reward: RewardOBJ, Risk: RiskOBJ }

    //Example of useEffect
    useEffect(() => {

        console.log("Execute formulas validations", { MaxSize })
        console.log("Execute formulas validations", { MaxLoss })
        console.log("Execute formulas validations", { Reward })
        console.log("Execute formulas validations", { Risk })

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
                            <PositionPlan />
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
