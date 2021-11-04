import React from 'react'
import { Button, Row } from 'react-bootstrap'
import ExecutionValue from './ExecutionValue'

export default function ExecutionResult({ executed, changeStoredExecute }) {

    return (
        <div>

            <div className="personal-box-shadow">
                <h5>
                    Executions
                </h5>
                <Row>
                    {executed.length === 0 ? <div>Waiting for executions ...</div>
                        : executed.map((values) => {
                            return <ExecutionValue values={values} key={values.id} changeStoredExecute={changeStoredExecute} />

                        })}
                </Row>
            </div>
        </div>
    )
}
