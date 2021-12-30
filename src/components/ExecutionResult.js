import React from 'react'

import ExecutionValue from './ExecutionValue'
import { Row, Col } from 'react-bootstrap';
import { Trans } from 'react-i18next';

const TITLE = <Trans>Trades</Trans>
const SHARES_LABEL = <Trans>Shares</Trans>
const PRICE_LABEL = <Trans>Price</Trans>
const NO_TRADES_ADDED = <Trans>Waiting for trades ...</Trans>


export default function ExecutionResult({ executionResult }) {
    const executed = executionResult.executed;
    return (
        <div>
            <div className="personal-box-shadow">
                <h5>
                    {TITLE}
                </h5>
                <Row>
                    <Col className="mb-3 align-items-center">
                        {PRICE_LABEL}
                    </Col>
                    <Col className="mb-3 align-items-center">
                        {SHARES_LABEL}
                    </Col>
                    <Col className="mb-3 align-items-center">
                    </Col>
                    {executed.length === 0 ? <div>{NO_TRADES_ADDED}</div>
                        : executed.map((values) => {
                            executionResult.values = values;
                            return <ExecutionValue executionValue={executionResult} key={values.id} />
                        })}
                </Row>
            </div>
        </div>
    )
}
