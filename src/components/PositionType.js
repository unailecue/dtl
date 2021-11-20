import React from 'react'
import Swal from 'sweetalert2'
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import * as utils from "../utils/utils";

const nameShortValue = <Trans>Short</Trans>;
const nameLongValue = <Trans>Long</Trans>;

const title = <Trans>Are you sure?</Trans>;
const text = <Trans>You won't be able to revert this!</Trans>;
const confirmButtonText = <Trans>Yes, delete it!</Trans>;
const cancelButtonText = <Trans>Cancel</Trans>;
const deletedTitle = <Trans>Deleted!</Trans>;
const deletedText = <Trans>Your inputs has been deleted.</Trans>;
const swal = {
    title: 'Are you sure?', text: "You won't be able to revert this!", confirmButtonText: 'Yes, delete it!', cancelButtonText: 'Cancel', deletedTitle: 'Deleted!', deletedText: 'Your inputs has been deleted.',
    //--------- this files should have translation but swal is not understanding it
    // title: <Trans>Are you sure?</Trans>,
    // text: <Trans>You won't be able to revert this!</Trans>,
    // confirmButtonText: <Trans>Yes, delete it!</Trans>,
    // cancelButtonText: <Trans>Cancel</Trans>,
    // deletedTitle: <Trans>Deleted!</Trans>,
    // deletedText: <Trans>Your inputs has been deleted.</Trans>,
}


export default function PositionType({ data }) {
    function handleChangeLong(e) {
        //* check if there is any change
        if (data.islong == true) return
        //* we set is long type to TRUE
        data.Executed.length === 0 ?
            data.setState(true) :
            confirmationOfDeleteExecutions(true);
    }
    function handleChangeShort(e) {
        //* check if there is any change
        if (data.islong == false) return
        //* we set is long type to FALSE
        data.Executed.length === 0 ?
            data.setState(false) :
            confirmationOfDeleteExecutions(false);
    }

    function confirmationOfDeleteExecutions(val) {
        //*Confirmation that you will delete all reacords
        const setExecuted = data.setExecuted;
        const setState = data.setState;
        utils.swal(swal, [() => setExecuted([]), () => setState(val)]);
    }
    return (
        <>
            <ButtonGroup aria-label="Transaction type">
                <ToggleButton type="checkbox" variant="outline-success" onClick={handleChangeLong} checked={data.islong} >{nameLongValue}</ToggleButton>
                <ToggleButton type="checkbox" variant="outline-danger" onClick={handleChangeShort} checked={!data.islong}>{nameShortValue}</ToggleButton>
            </ButtonGroup>
        </>
    )
}
