import React, { useRef, useState } from 'react'
import { v4 as uniqueId } from "uuid";
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2'

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


    function handleBuyExecution(e) {
        const shares = sharesInput.current.value;
        isLong ?
            handleAddExecutions(Math.abs(parseFloat(shares)))
            :
            handleAddExecutions(Math.abs(parseFloat(shares)) * -1)
    }
    function handleSellExecution(e) {
        const shares = sharesInput.current.value;
        isLong ?
            handleAddExecutions(Math.abs(parseFloat(shares)) * -1)
            :
            handleAddExecutions(Math.abs(parseFloat(shares)))
    }
    //Fuction that add the value of the execution to the executions obj
    function handleAddExecutions(shares) {
        const price = priceInput.current.value;

        if (shares === "" || price === "") return
        setExecuted([...executed, { id: uniqueId(), shares: shares, price: price }])
        sharesInput.current.value = "";
        priceInput.current.value = "";
    }
    function handleDeleteExecutions(e) {
        const title = swalTexts.title;
        const text = swalTexts.text;
        const confirmButtonText = swalTexts.confirmButtonText;
        const cancelButtonText = swalTexts.cancelButtonText;
        const deletedTitle = swalTexts.deletedTitle;
        const deletedText = swalTexts.deletedText;

        //Confirmation that you will delete all reacords
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }).then((result) => {
            if (result.isConfirmed) {
                setExecuted([]);
                Swal.fire(
                    deletedTitle,
                    deletedText,
                    'success'
                )
            }
        })

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
        </div>
    )
}
