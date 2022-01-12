import React, { useState, useEffect } from 'react'
import PositionType from './PositionType'
import { Row, Container } from 'react-bootstrap';
import PositionRulesInput from './PositionRulesInput';
import { Trans } from 'react-i18next';
import Alert from 'react-bootstrap/Alert'


const TITLE = <Trans>Rules</Trans>;
const SHORT_VALIDATION_MESSAGE = <Trans>In Short the risk level should be higher than reward level</Trans>;
const LONG_VALIDATION_MESSAGE = <Trans>In Long reward level should be higher than risk level</Trans>;
const MAX_SIZE_OBJ = { name: <Trans>Max Size</Trans>, onlyDolarSymbol: true };
const MAX_LOSS_OBJ = { name: <Trans>Max Loss</Trans>, onlyDolarSymbol: true };
const REWARD_OBJ = { name: <Trans>Reward level price</Trans>, onlyDolarSymbol: true };
const RISK_OBJ = { name: <Trans>Risk level price</Trans>, onlyDolarSymbol: true };


export default function PositionRules({ positionRulesObj }) {

    const [showAlert, setShowAlert] = useState(false);

    const positionType = positionRulesObj.PositionTypeObj;
    const MaxSize = { ...positionRulesObj.MaxSizeObj, ...MAX_SIZE_OBJ };
    const MaxLoss = { ...positionRulesObj.MaxLossObj, ...MAX_LOSS_OBJ };
    const Reward = { ...positionRulesObj.RewardObj, ...REWARD_OBJ };
    const Risk = { ...positionRulesObj.RiskObj, ...RISK_OBJ };

    const isLong = positionType.islong;
    const RiskValue = positionRulesObj.RiskObj.value;
    const RewardValue = positionRulesObj.RewardObj.value;


    //*Effect to check if alert should be displayed
    useEffect(() => {
        if (isLong && (RiskValue > RewardValue)) return setShowAlert(true);
        if (!isLong && (RiskValue < RewardValue)) return setShowAlert(true);
        setShowAlert(false)
    }, [isLong, RiskValue, RewardValue])

    return (
        <div className="box">
            <Container>
                <h3>
                    {TITLE}
                </h3>
                <hr />
                <Row>
                    <PositionType data={positionType} />
                </Row>
                <hr />
                <Row>
                    <PositionRulesInput data={MaxSize} />
                </Row>
                <Row>
                    <PositionRulesInput data={MaxLoss} />
                </Row>
                <hr />
                <Alert variant="danger" hidden={!showAlert}>
                    {isLong ? LONG_VALIDATION_MESSAGE : SHORT_VALIDATION_MESSAGE}
                </Alert>
                {
                    //*to top the reward only in long
                    isLong &&
                    <Row>
                        <PositionRulesInput data={Reward} />
                    </Row>
                }
                <Row>
                    <PositionRulesInput data={Risk} />
                </Row>
                {
                    //*to put reward on bottom in short
                    !isLong &&
                    <Row>
                        <PositionRulesInput data={Reward} />
                    </Row>
                }
            </Container>
        </div>
    )
}
