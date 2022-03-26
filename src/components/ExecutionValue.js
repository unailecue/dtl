import React, { useRef, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ENABLE_BUTTON_TEXT = "Edit";
const DELETE_BUTTON = "Delete"


export default function ExecutionValue({ executionValue, values }) {
    const { t } = useTranslation();

    const sharesInput = useRef()
    const priceInput = useRef()
    const [isLocked, setisLocked] = useState(true)

    const ChangeStoredExecute = executionValue.ChangeStoredExecute
    const DeleteStoredExecute = executionValue.DeleteStoredExecute
    const typeValues = executionValue.typeValues

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

    function handleEdit(sharesInputValue) {
        if (sharesInputValue !== values.shares || priceInput.current.value !== values.price) {
            const isChangeExecuted = ChangeStoredExecute(values.id, sharesInputValue, priceInput.current.value)
            if (!isChangeExecuted) return
            sharesInput.current.value = sharesInputValue;
        }
        priceInput.current.disabled = true;
        sharesInput.current.disabled = true;
        setisLocked(true);
    }

    function handleDelete(e) {
        const idToDelete = values.id;
        DeleteStoredExecute(idToDelete)
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
                    <Button className="edit" onClick={handleUnlock} variant="secondary" hidden={!isLocked}>{t(ENABLE_BUTTON_TEXT)}</Button>
                    <Button className="edit" onClick={handleEditBuy} variant={isLong ? "success" : "danger"} hidden={isLocked}>{t(buyButton)}</Button>
                </Col>
                <Col hidden={isLocked}>
                    <Button className="edit" onClick={handleEditSell} variant="secondary" hidden={isLocked}>{t(sellButton)}</Button>
                </Col>
                <Col hidden={isLocked}>
                    <Button className="edit" onClick={handleDelete} variant="warning" hidden={isLocked}>{t(DELETE_BUTTON)}</Button>
                </Col>
            </Row>

        </div >
    )
}
