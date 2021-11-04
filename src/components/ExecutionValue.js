import React, { useRef, useState } from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container, InputGroup } from 'react-bootstrap';


export default function ExecutionValue({ values, changeStoredExecute }) {
    const sharesInput = useRef()
    const priceInput = useRef()
    const [isLocked, setisLocked] = useState(true)
    const key = values.id;
    const shares = values.shares;
    const price = values.price;

    function handleUnlock(e) {
        priceInput.current.disabled = false;
        sharesInput.current.disabled = false;
        setisLocked(false);
        // priceInput.current.style.backgroundColor = "blue";

    }
    function handleEdit(e) {

        if (sharesInput.current.value !== values.shares || priceInput.current.value !== values.price) {
            changeStoredExecute(values.id, sharesInput.current.value, priceInput.current.value)
        }
        priceInput.current.disabled = true;
        sharesInput.current.disabled = true;
        setisLocked(true);

        // priceInput.current.style.backgroundColor = "blue";
    }
    return (
        <div>
            <Row>
                <Col>
                    <Form.Group as={Row} className="mb-3 align-items-center">

                        <Col>
                            Shares
                            <Form.Control type="number" ref={sharesInput} placeholder="Sh" defaultValue={shares} disabled />
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Col>
                            Price
                            <Form.Control type="number" ref={priceInput} placeholder="$/sh" defaultValue={price} disabled />
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Button className="edit" onClick={handleUnlock} variant="secondary" hidden={!isLocked}>Enable</Button>
                    <Button className="edit" onClick={handleEdit} variant="warning" hidden={isLocked}>Edit</Button>
                </Col>
            </Row>

        </div >
    )
}
