import React from 'react'
import PositionType from './PositionType'
import { Row, Container } from 'react-bootstrap';
import PositionRulesInput from './PositionRulesInput';


export default function PositionRules({ positionRules }) {

    const title = positionRules.title;
    const positionType = positionRules.PositionType;
    const MaxSize = positionRules.MaxSize;
    const MaxLoss = positionRules.MaxLoss;
    const Reward = positionRules.Reward;
    const Risk = positionRules.Risk;


    return (
        <div className="box">
            <Container>
                <h3>
                    {title}
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
