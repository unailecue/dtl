import React, { useRef, useState } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';


export default function ExecutionValue({ executionResult, values, changeStoredExecute, typeValues }) {
    const enableButtonText = executionResult.enableButtonText;


    const sharesInput = useRef()
    const priceInput = useRef()
    const [isLocked, setisLocked] = useState(true)
    const key = values.id;
    const shares = values.shares;
    const price = values.price;
    const isLong = typeValues.isLong;
    const buyButton = typeValues.buyButton;
    const sellButton = typeValues.sellButton;

    //function that will unlock this execution input
    function handleUnlock(e) {
        priceInput.current.disabled = false;
        sharesInput.current.disabled = false;
        setisLocked(false);
    }

    function handleEditBuy(e) {
        let sharesInputValue = Math.abs(sharesInput.current.value);
        isLong ? handleEdit(sharesInputValue) : handleEdit(sharesInputValue * -1)
    }
    function handleEditSell(e) {
        let sharesInputValue = Math.abs(sharesInput.current.value);
        isLong ? handleEdit(sharesInputValue * -1) : handleEdit(sharesInputValue)
    }
    // function that will try to edit the value of this execution
    function handleEdit(sharesInputValue) {

        if (sharesInputValue !== values.shares || priceInput.current.value !== values.price) {
            changeStoredExecute(values.id, sharesInputValue, priceInput.current.value)
        }
        priceInput.current.disabled = true;
        sharesInput.current.value = sharesInputValue;
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
                    <Button className="edit" onClick={handleEditBuy} variant={isLong ? "success" : "danger"} hidden={isLocked}>{buyButton}</Button>
                </Col>
                <Col hidden={isLocked}>
                    <Button className="edit" onClick={handleEditSell} variant="secondary" hidden={isLocked}>{sellButton}</Button>
                </Col>
            </Row>

        </div >
    )
}
