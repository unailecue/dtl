import React, { useRef, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Trans } from 'react-i18next';
const enableButtonText = <Trans>Enable</Trans>;


export default function ExecutionValue({ values, changeStoredExecute, typeValues }) {


    const sharesInput = useRef()
    const priceInput = useRef()
    const [isLocked, setisLocked] = useState(true)
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
            const isChangeExecuted = changeStoredExecute(values.id, sharesInputValue, priceInput.current.value)
            if (!isChangeExecuted) return
            priceInput.current.disabled = true;
            sharesInput.current.value = sharesInputValue;
            sharesInput.current.disabled = true;
        }
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
