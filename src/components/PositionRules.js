import React from 'react'
import PositionType from './PositionType'
import { Row, Container } from 'react-bootstrap';
import PositionRulesInput from './PositionRulesInput';
import { Trans } from 'react-i18next';


const TITLE = <Trans>Rules</Trans>;
const MAX_SIZE_OBJ = { name: <Trans>Max Size</Trans>, onlyDolarSymbol: true };
const MAX_LOSS_OBJ = { name: <Trans>Max Loss</Trans>, onlyDolarSymbol: true };
const REWARD_OBJ = { name: <Trans>Planned reward level</Trans>, onlyDolarSymbol: false };
const RISK_OBJ = { name: <Trans>Planned risk level</Trans>, onlyDolarSymbol: false };


export default function PositionRules({ positionRulesObj }) {


    const positionType = positionRulesObj.PositionTypeObj;
    const MaxSize = { ...positionRulesObj.MaxSizeObj, ...MAX_SIZE_OBJ };
    const MaxLoss = { ...positionRulesObj.MaxLossObj, ...MAX_LOSS_OBJ };
    const Reward = { ...positionRulesObj.RewardObj, ...REWARD_OBJ };
    const Risk = { ...positionRulesObj.RiskObj, ...RISK_OBJ };

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
                <Row>
                    <PositionRulesInput data={Reward} />
                </Row>
                <Row>
                    <PositionRulesInput data={Risk} />
                </Row>




            </Container>
        </div>
    )
}
