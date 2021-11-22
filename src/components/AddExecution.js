import React, { useRef } from 'react'
import { v4 as uniqueId } from "uuid";
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as utils from "../utils/utils";
import { Trans } from 'react-i18next';

const confirmationValues = {
    title: <Trans>Are you sure?</Trans>,
    text: <Trans>You won't be able to revert this!</Trans>,
    confirmButtonText: <Trans>Yes, delete it!</Trans>,
    cancelButtonText: <Trans>Cancel</Trans>,
    deletedTitle: <Trans>Deleted!</Trans>,
    deletedText: <Trans>Your inputs has been deleted.</Trans>
};

export default function AddExecution({ addExecution, executed, setExecuted, typeValues }) {
    const title = addExecution.title;
    const deleteAllText = addExecution.deleteAllText;
    const sharesLabel = addExecution.sharesLabel;
    const priceLabel = addExecution.priceLabel;


    const isLong = typeValues.isLong;
    const buyButton = typeValues.buyButton;
    const sellButton = typeValues.sellButton;

    const sharesInput = useRef()
    const priceInput = useRef()

    function handleBuyExecution(e) {
        const shares = utils.abs(sharesInput.current.value);
        isLong ? handleAddExecutions(shares) : handleAddExecutions((shares) * -1)
    }

    function handleSellExecution(e) {
        const shares = utils.abs(sharesInput.current.value);
        isLong ? handleAddExecutions((shares) * -1) : handleAddExecutions(shares)
    }

    //*Fuction that add the value of the execution to the executions obj
    function handleAddExecutions(shares) {
        if (!utils.validationsCheckExecutions(isLong, executed, shares)) return
        const price = utils.abs(priceInput.current.value);
        if (shares === "" || price === "" || shares === 0 || price === 0) return
        setExecuted([...executed, { id: uniqueId(), shares: shares, price: price }])
        sharesInput.current.value = "";
        priceInput.current.value = "";
    }

    function handleDeleteExecutions(e) {
        //* Confirmation that you will delete all reacords
        const confirmFunctions = () => setExecuted([]);
        utils.confirmationsModal(confirmationValues, [confirmFunctions]);
    }

    return (
        <div>
            <div className="personal-box-shadow">
                <Row>
                    <Col>
                        <h5>
                            {title}
                        </h5>
                    </Col>
                    <Col className="align-right">
                        <Button className="justify-content-end delete-all" variant="link" onClick={handleDeleteExecutions} >{deleteAllText}</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Col>
                                {priceLabel}
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
                                {sharesLabel}
                                <InputGroup>
                                    <Form.Control type="number" ref={sharesInput} />
                                    <InputGroup.Text> sh</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col xs="6" className="center">
                        <div className="d-grid gap-2">
                            <Button className="add-button" variant={isLong ? "success" : "danger"} onClick={handleBuyExecution} >{buyButton}</Button>
                        </div>
                    </Col>
                    <Col xs="6 " className="center">
                        <div className="d-grid gap-2">
                            <Button className="add-button" variant="secondary" onClick={handleSellExecution} >{sellButton}</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
