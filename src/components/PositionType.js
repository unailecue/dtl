import React from 'react'
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table } from 'react-bootstrap';
import { v4 as uniqueId } from "uuid";



export default function PositionType({ data }) {
    function handleChangeLong(e) {
        // we set is long type to TRUE
        data.setState(true);
    }
    function handleChangeShort(e) {
        // we set is long type to FALSE
        data.setState(false);
    }

    return (
        <>
            <ButtonGroup aria-label="Transaction type">
                <ToggleButton type="checkbox" variant="outline-success" onClick={handleChangeLong} checked={data.islong} >{data.nameLongValue || "Long"}</ToggleButton>
                <ToggleButton type="checkbox" variant="outline-danger" onClick={handleChangeShort} checked={!data.islong}>{data.nameShortValue || "Short"}</ToggleButton>
            </ButtonGroup>
        </>
    )
}
