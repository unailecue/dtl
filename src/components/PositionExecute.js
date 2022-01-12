import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import AddExecution from './AddExecution';
import ExecutionResult from './ExecutionResult';
import PlanningResults from './PlanningResults';
import { Trans } from 'react-i18next';

const PLANNIN_RESULT_TITLE = <Trans>Plan results executed</Trans>
const addButtonTextLong = <Trans>Buy</Trans>;
const addButtonTextShort = <Trans>Short</Trans>
const sellButtonTextLong = <Trans>Sell</Trans>
const sellButtonTextShort = <Trans>Cover</Trans>

export default function PositionExecute({ positionExecuteObj }) {
    const [ButtonTextBuyValue, setButtonTextBuyValue] = useState(addButtonTextLong)
    const [ButtonTextSellValue, setButtonTextSellValue] = useState(sellButtonTextLong)
    const isLong = positionExecuteObj.isLong;
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

    const executed = positionExecuteObj.executed;
    const ChangeStoredExecute = positionExecuteObj.ChangeStoredExecute;
    const DeleteStoredExecute = positionExecuteObj.DeleteStoredExecute;
    const setExecuted = positionExecuteObj.setExecuted;
    const planningResults = positionExecuteObj.planningResults;
    planningResults.title = PLANNIN_RESULT_TITLE;
    const executionResult = {
        typeValues, executed, setExecuted, ChangeStoredExecute, DeleteStoredExecute,
    }



    return (
        <div className="box">
            <h5>Executed</h5>
            <Row>
                <Col sm="6">
                    <Row>
                        <AddExecution executed={executed} setExecuted={setExecuted} typeValues={typeValues} />
                    </Row>
                    <Row>
                        <ExecutionResult executionResult={executionResult} />
                    </Row>
                </Col>
                <Col sm="6">
                    <PlanningResults planningResults={planningResults} />
                </Col>

            </Row>
        </div>
    )
}
