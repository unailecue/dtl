import React from 'react'
import ExecutionValue from './ExecutionValue'
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TITLE = "Trades"
const SHARES_LABEL = "Shares"
const PRICE_LABEL = "Price"
const NO_TRADES_ADDED = "Waiting for trades ..."


export default function ExecutionResult({ executionResult }) {
    const { t } = useTranslation();
    const executed = executionResult.executed;
    return (
        <div>
            <div className="personal-box-shadow">
                <h5>
                    {t(TITLE)}
                </h5>
                <Row>
                    <Col className="mb-3 align-items-center">
                        {t(PRICE_LABEL)}
                    </Col>
                    <Col className="mb-3 align-items-center">
                        {t(SHARES_LABEL)}
                    </Col>
                    <Col className="mb-3 align-items-center">
                    </Col>
                    {executed.length === 0 ? <div>{t(NO_TRADES_ADDED)}</div>
                        : executed.map((values) => {
                            return <ExecutionValue executionValue={executionResult} key={values.id} values={values} />
                        })}
                </Row>
            </div>
        </div>
    )
}
