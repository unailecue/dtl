import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import AddExecution from './AddExecution';
import ExecutionResult from './ExecutionResult';
import PlanningResults from './PlanningResults';
import { Trans } from 'react-i18next';

const addButtonTextLong = <Trans>Buy</Trans>;
const addButtonTextShort = <Trans>Short</Trans>
const sellButtonTextLong = <Trans>Sell</Trans>
const sellButtonTextShort = <Trans>Cover</Trans>

export default function PositionExecute({ positionExecute }) {
    const [ButtonTextBuyValue, setButtonTextBuyValue] = useState(addButtonTextLong)
    const [ButtonTextSellValue, setButtonTextSellValue] = useState(sellButtonTextLong)
    const isLong = positionExecute.isLong;
    useEffect(() => {
        if (isLong === true) {
            setButtonTextBuyValue(addButtonTextLong)
            setButtonTextSellValue(sellButtonTextLong)
        } else {
            setButtonTextBuyValue(addButtonTextShort)
            setButtonTextSellValue(sellButtonTextShort)
        }
    }, [isLong])

    const typeValues = { isLong: isLong, buyButton: ButtonTextBuyValue, sellButton: ButtonTextSellValue }

    const addExecution = positionExecute.addExecution;
    const executionResult = positionExecute.executionResult;
    const executed = positionExecute.executed;
    const setExecuted = positionExecute.setExecuted;
    const changeStoredExecute = positionExecute.changeStoredExecute;
    const planningResults = positionExecute.planningResults;

    return (
        <div className="box">
            <h5>Execute</h5>
            <Row>
                <Col sm="6">
                    <Row>
                        <AddExecution addExecution={addExecution} executed={executed} setExecuted={setExecuted} typeValues={typeValues} />
                    </Row>
                    <Row>
                        <ExecutionResult executionResult={executionResult} executed={executed} changeStoredExecute={changeStoredExecute} typeValues={typeValues} />
                    </Row>
                </Col>
                <Col sm="6">
                    <PlanningResults planningResults={planningResults} />
                </Col>

            </Row>
        </div>
    )
}
