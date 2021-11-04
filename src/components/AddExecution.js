import React, { useRef } from 'react'
import { v4 as uniqueId } from "uuid";
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2'

export default function AddExecution({ executed, setExecuted }) {
    const sharesInput = useRef()
    const priceInput = useRef()
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



        //confirmacion
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setExecuted([]);
                Swal.fire(
                    'Deleted!',
                    'Your inputs has been deleted.',
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
                            Add executions
                        </h5>
                    </Col>
                    <Col className="align-right">
                        <Button className="justify-content-end delete-all" variant="link" onClick={handleDeleteExecutions} >delete all</Button>
                    </Col>
                </Row>



                <Row>
                    <Col>
                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Col>
                                Shares
                                <InputGroup>

                                    <Form.Control type="number" ref={sharesInput} />
                                    <InputGroup.Text> sh</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Col>
                                Price
                                <InputGroup>
                                    <Form.Control type="number" ref={priceInput} />
                                    <InputGroup.Text> $/sh</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col xs="3">
                        <Button className="add-button" onClick={handleAddExecutions} >Add</Button>
                    </Col>
                    {/* <Col xs="4">
                        <Button onClick={() => { console.log(executed) }}>check</Button>
                    </Col> */}

                </Row>
            </div>
        </div>
    )
}
