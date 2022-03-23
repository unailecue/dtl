import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import AddExecution from './AddExecution';
import ExecutionResult from './ExecutionResult';
import PlanningResults from './PlanningResults';
import { useTranslation } from 'react-i18next';

const PLANNIN_RESULT_TITLE = "Plan results executed"
const ADD_BUTTOM_TEXT_LONG = "Buy";
const ADD_BUTTOM_TEXT_SHORT = "Short"
const SELL_BUTTON_TEXT_LONG = "Sell"
const SELL_BUTTON_TEXT_SHORT = "Cover"
const HEADING_POSITION_EXECUTED = "Executed"

export default function PositionExecute({ positionExecuteObj }) {
    const { t } = useTranslation();
    const [ButtonTextBuyValue, setButtonTextBuyValue] = useState(ADD_BUTTOM_TEXT_LONG)
    const [ButtonTextSellValue, setButtonTextSellValue] = useState(SELL_BUTTON_TEXT_LONG)
    const isLong = positionExecuteObj.isLong;
    useEffect(() => {
        if (isLong === true) {
            setButtonTextBuyValue(ADD_BUTTOM_TEXT_LONG)
            setButtonTextSellValue(SELL_BUTTON_TEXT_LONG)
        } else {
            setButtonTextBuyValue(ADD_BUTTOM_TEXT_SHORT)
            setButtonTextSellValue(SELL_BUTTON_TEXT_SHORT)
        }
    }, [isLong])

    const typeValues = { isLong: isLong, buyButton: ButtonTextBuyValue, sellButton: ButtonTextSellValue }

    const executed = positionExecuteObj.executed;
    const ChangeStoredExecute = positionExecuteObj.ChangeStoredExecute;
    const DeleteStoredExecute = positionExecuteObj.DeleteStoredExecute;
    const setExecuted = positionExecuteObj.setExecuted;
    const planningResults = positionExecuteObj.planningResults;
    planningResults.title = t(PLANNIN_RESULT_TITLE);
    const executionResult = {
        typeValues, executed, setExecuted, ChangeStoredExecute, DeleteStoredExecute,
    }



    return (
        <div className="box">
            <h5>{t(HEADING_POSITION_EXECUTED)}</h5>
            <Row>
                <Col sm="6" lg="12" xl="6">
                    <Row>
                        <AddExecution executed={executed} setExecuted={setExecuted} typeValues={typeValues} />
                    </Row>
                    <Row>
                        <ExecutionResult executionResult={executionResult} />
                    </Row>
                </Col>
                <Col sm="6"
                    lg={{ order: 'first', span: 12 }}
                    xl={{ order: 'last', span: 6 }}
                >
                    <PlanningResults planningResults={planningResults} />
                </Col>

            </Row>
        </div>
    )
}
