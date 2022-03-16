import React, { useState, useEffect } from 'react'
import PositionType from './PositionType'
import { Row, Container } from 'react-bootstrap';
import PositionRulesInput from './PositionRulesInput';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert'


const TITLE = "Rules";
const SHORT_VALIDATION_MESSAGE = "In Short the risk level should be higher than reward level";
const LONG_VALIDATION_MESSAGE = "In Long reward level should be higher than risk level";
const MAX_SIZE_OBJ = { name: "Max Size", onlyDolarSymbol: true };
const MAX_LOSS_OBJ = { name: "Max Loss", onlyDolarSymbol: true };
const REWARD_OBJ = { name: "Reward level price", onlyDolarSymbol: true };
const RISK_OBJ = { name: "Risk level price", onlyDolarSymbol: true };


export default function PositionRules({ positionRulesObj }) {
    const { t } = useTranslation();
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
                    {t(TITLE)}
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
                    {isLong ? t(LONG_VALIDATION_MESSAGE) : t(SHORT_VALIDATION_MESSAGE)}
                </Alert>
                {//*to top the reward only in long
                    isLong &&
                    <Row>
                        <PositionRulesInput data={Reward} />
                    </Row>
                }
                <Row>
                    <PositionRulesInput data={Risk} />
                </Row>
                {//*to put reward on bottom in short
                    !isLong &&
                    <Row>
                        <PositionRulesInput data={Reward} />
                    </Row>
                }
            </Container>
        </div>
    )
}
