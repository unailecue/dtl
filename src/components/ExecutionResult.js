import React from 'react'

import ExecutionValue from './ExecutionValue'
import { Row, Col } from 'react-bootstrap';
import { Trans } from 'react-i18next';

const title = <Trans>Executions</Trans>
const sharesLabel = <Trans>Shares</Trans>
const priceLabel = <Trans>Price</Trans>


export default function ExecutionResult({ executed, changeStoredExecute, typeValues }) {

    return (
        <div>

            <div className="personal-box-shadow">
                <h5>
                    {title}
                </h5>
                <Row>
                    <Col className="mb-3 align-items-center">
                        {priceLabel}
                    </Col>
                    <Col className="mb-3 align-items-center">
                        {sharesLabel}
                    </Col>
                    <Col className="mb-3 align-items-center">
                    </Col>
                    {executed.length === 0 ? <div>Waiting for executions ...</div>
                        : executed.map((values) => {
                            return <ExecutionValue values={values} key={values.id} changeStoredExecute={changeStoredExecute} typeValues={typeValues} />
                        })}
                </Row>
            </div>
        </div>
    )
}
