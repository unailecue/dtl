import React, { useRef, useEffect } from 'react'
import { v4 as uniqueId } from "uuid";
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";
import { useTranslation } from 'react-i18next';

let confirmationValues = {
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    deletedTitle: "Deleted!",
    deletedText: "Your inputs has been deleted."
};
const TITLE = "Add trade";
const DELETE_ALL_TEXT = "delete all";
const SHARES_LABEL = "Shares";
const PRICE_LABEL = "Price";

export default function AddExecution({ executed, setExecuted, typeValues }) {
    const { t } = useTranslation();
    const isLong = typeValues.isLong;
    const buyButton = typeValues.buyButton;
    const sellButton = typeValues.sellButton;

    confirmationValues.title = t(confirmationValues.title)
    confirmationValues.text = t(confirmationValues.text)
    confirmationValues.confirmButtonText = t(confirmationValues.confirmButtonText)
    confirmationValues.cancelButtonText = t(confirmationValues.cancelButtonText)
    confirmationValues.deletedTitle = t(confirmationValues.deletedTitle)
    confirmationValues.deletedText = t(confirmationValues.deletedText)

    const sharesInput = useRef()
    const priceInput = useRef()

    useEffect(() => { //*Effect that errase the values of unexecuted transactions when type changes
        sharesInput.current.value = null;
        priceInput.current.value = null;
    }, [isLong]);

    function handleBuyExecution(e) {
        const shares = utils.abs(sharesInput.current.value);
        isLong ? handleAddExecutions(shares) : handleAddExecutions((shares) * -1)
    }

    function handleSellExecution(e) {
        const shares = utils.abs(sharesInput.current.value);
        isLong ? handleAddExecutions((shares) * -1) : handleAddExecutions(shares)
    }

    function handleAddExecutions(shares) { //*Fuction that add the value of the execution to the executions obj
        if (!utils.validationsCheckExecutions(isLong, executed, shares)) return
        const price = utils.abs(priceInput.current.value);
        if (shares === "" || price === "" || shares === 0 || price === 0) return
        setExecuted([...executed, { id: uniqueId(), shares: shares, price: price }])
        sharesInput.current.value = "";
        priceInput.current.value = "";
    }

    function handleDeleteExecutions(e) {
        const confirmFunctions = () => setExecuted([]);//* Confirmation that you will delete all reacords
        utils.confirmationsModal(confirmationValues, [confirmFunctions]);
    }

    return (
        <div>
            <div className="personal-box-shadow">
                <Row>
                    <Col>
                        <h5>
                            {t(TITLE)}
                        </h5>
                    </Col>
                    <Col className="align-right">
                        <Button className="justify-content-end delete-all" variant="link" onClick={handleDeleteExecutions} >{t(DELETE_ALL_TEXT)}</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Col>
                                {t(PRICE_LABEL)}
                                <InputGroup>
                                    <Form.Control type="number" ref={priceInput} />
                                    <InputGroup.Text> $/sh</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col xs="6">
                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Col>
                                {t(SHARES_LABEL)}
                                <InputGroup>
                                    <Form.Control type="number" ref={sharesInput} />
                                    <InputGroup.Text> sh</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col xs="6" className="center">
                        <div className="d-grid gap-2">
                            <Button className="add-button" variant={isLong ? "success" : "danger"} onClick={handleBuyExecution} >{t(buyButton)}</Button>
                        </div>
                    </Col>
                    <Col xs="6 " className="center">
                        <div className="d-grid gap-2">
                            <Button className="add-button" variant="secondary" onClick={handleSellExecution} >{t(sellButton)}</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
