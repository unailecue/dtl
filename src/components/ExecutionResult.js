import React from 'react'
import { Button, Row } from 'react-bootstrap'
import ExecutionValue from './ExecutionValue'

export default function ExecutionResult({ executionResult, executed, changeStoredExecute }) {
    const title = executionResult.title
    return (
        <div>

            <div className="personal-box-shadow">
                <h5>
                    {title}
                </h5>
                <Row>
                    {executed.length === 0 ? <div>Waiting for executions ...</div>
                        : executed.map((values) => {
                            return <ExecutionValue executionResult={executionResult} values={values} key={values.id} changeStoredExecute={changeStoredExecute} />

                        })}
                </Row>
            </div>
        </div>
    )
}
