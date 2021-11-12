import React, { useRef } from 'react'
import { v4 as uniqueId } from "uuid";
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2'

export default function AddExecution({ addExecution, executed, setExecuted }) {
    const title = addExecution.title;
    const deleteAllText = addExecution.deleteAllText;
    const sharesLabel = addExecution.sharesLabel;
    const priceLabel = addExecution.priceLabel;
    const addButtonText = addExecution.addButtonText;
    const isLong = addExecution.isLong;
    const swalTexts = addExecution.swal;


    const sharesInput = useRef()
    const priceInput = useRef()

    //Fuction that add the value of the execution to the executions obj
    function handleAddExecutions(e) {
        const shares = sharesInput.current.value;
        const price = priceInput.current.value;
        if (shares === "" || price === "") return
        setExecuted([...executed, { id: uniqueId(), shares: shares, price: price }])
        // setExecuted(prevtodos => { return [...prevtodos, { id: uniqueId(), name: name, complete: false }] })
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

                    <Col>
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
                    <Col>
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
                    <Col xs="3">
                        <Button className="add-button" variant={isLong ? "success" : "danger"} onClick={handleAddExecutions} >{addButtonText}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
