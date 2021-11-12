import React, { useRef, useState } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';


export default function ExecutionValue({ executionResult, values, changeStoredExecute }) {
    const sharesLabel = executionResult.sharesLabel;
    const priceLabel = executionResult.priceLabel;
    const editButtonText = executionResult.editButtonText;
    const enableButtonText = executionResult.enableButtonText;


    const sharesInput = useRef()
    const priceInput = useRef()
    const [isLocked, setisLocked] = useState(true)
    const key = values.id;
    const shares = values.shares;
    const price = values.price;

    //function that will unlock this execution input
    function handleUnlock(e) {
        priceInput.current.disabled = false;
        sharesInput.current.disabled = false;
        setisLocked(false);
    }
    // function that will try to edit the value of this execution
    function handleEdit(e) {
        if (sharesInput.current.value !== values.shares || priceInput.current.value !== values.price) {
            changeStoredExecute(values.id, sharesInput.current.value, priceInput.current.value)
        }
        priceInput.current.disabled = true;
        sharesInput.current.disabled = true;
        setisLocked(true);
    }
    return (
        <div>
            <Row>

                <Col>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Col>
                            <Form.Control type="number" ref={priceInput} placeholder="$/sh" defaultValue={price} disabled />
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group as={Row} className="mb-3 align-items-center">

                        <Col>
                            <Form.Control type="number" ref={sharesInput} placeholder="Sh" defaultValue={shares} disabled />
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Button className="edit" onClick={handleUnlock} variant="secondary" hidden={!isLocked}>{enableButtonText}</Button>
                    <Button className="edit" onClick={handleEdit} variant="warning" hidden={isLocked}>{editButtonText}</Button>
                </Col>
            </Row>

        </div >
    )
}
