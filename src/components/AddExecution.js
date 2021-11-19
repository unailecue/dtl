import React, { useRef, useState } from 'react'
import { v4 as uniqueId } from "uuid";
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2'
import * as utils from "../utils/utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddExecution({ addExecution, executed, setExecuted, typeValues }) {
    const title = addExecution.title;
    const deleteAllText = addExecution.deleteAllText;
    const sharesLabel = addExecution.sharesLabel;
    const priceLabel = addExecution.priceLabel;
    const swalTexts = addExecution.swal;

    const isLong = typeValues.isLong;
    const buyButton = typeValues.buyButton;
    const sellButton = typeValues.sellButton;

    const sharesInput = useRef()
    const priceInput = useRef()
    // todo: ValidateFieldsInput -> we need to create a method that allows to check if the imputs are positive numbers, shares and price

    function handleBuyExecution(e) {
        const shares = utils.abs(sharesInput.current.value);
        isLong ? handleAddExecutions(shares) : handleAddExecutions((shares) * -1)
    }
    function handleSellExecution(e) {
        const shares = utils.abs(sharesInput.current.value);
        isLong ? handleAddExecutions((shares) * -1) : handleAddExecutions(shares)
    }
    //Fuction that add the value of the execution to the executions obj
    function handleAddExecutions(shares) {
        // todo: validationsCheckExecutions -> we need to check if the execution that we are trying to do is logical for the execution type, not having positive shares in short or negative ammount of share in long 
        // validations.printArrat(executed);
        const price = utils.abs(priceInput.current.value);
        if (shares === "" || price === "" || shares === 0 || price === 0) return
        setExecuted([...executed, { id: uniqueId(), shares: shares, price: price }])
        sharesInput.current.value = "";
        priceInput.current.value = "";
    }
    function handleDeleteExecutions(e) {
        //* Confirmation that you will delete all reacords
        const confirmFunctions = () => setExecuted([]);
        utils.swal(swalTexts, [confirmFunctions]);

    }

    return (
        <div>
            <div className="personal-box-shadow">
                {/* <button onClick={() => utils.error("Mensaje")}>Notify!</button> */}
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
