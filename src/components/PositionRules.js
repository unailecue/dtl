import React, { useEffect, useRef, useState } from 'react'
import PositionType from './PositionType'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';
import PositionRulesInput from './PositionRulesInput';
import { v4 as uniqueId } from "uuid";

export default function PositionRules({ positionRules }) {

    const positionType = positionRules.PositionType;
    const MaxSize = positionRules.MaxSize;
    const MaxLoss = positionRules.MaxLoss;
    const Reward = positionRules.Reward;
    const Risk = positionRules.Risk;


    return (
        <div className="box">
            <Container>
                <h3>
                    Rules
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
