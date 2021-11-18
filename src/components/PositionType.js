import React from 'react'
import Swal from 'sweetalert2'
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Trans } from 'react-i18next';

const nameShortValue = <Trans>Short</Trans>;
const nameLongValue = <Trans>Long</Trans>;

const title = <Trans>Are you sure?</Trans>;
const text = <Trans>You won't be able to revert this!</Trans>;
const confirmButtonText = <Trans>Yes, delete it!</Trans>;
const cancelButtonText = <Trans>Cancel</Trans>;
const deletedTitle = <Trans>Deleted!</Trans>;
const deletedText = <Trans>Your inputs has been deleted.</Trans>;



export default function PositionType({ data }) {
    function handleChangeLong(e) {
        //check if there is any change
        if (data.islong == true) return
        // we set is long type to TRUE
        data.Executed.length === 0 ?
            data.setState(true) :
            confirmationOfDeleteExecutions(true);
    }
    function handleChangeShort(e) {
        //check if there is any change
        if (data.islong == false) return
        // we set is long type to FALSE
        data.Executed.length === 0 ?
            data.setState(false) :
            confirmationOfDeleteExecutions(false);
    }

    function confirmationOfDeleteExecutions(val) {
        //Confirmation that you will delete all reacords
        const setExecuted = data.setExecuted;
        const setState = data.setState;
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
                setState(val);

                Swal.fire(
                    deletedTitle,
                    deletedText,
                    'success'
                )
            }
        })

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
