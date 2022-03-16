import React from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as utils from "../utils/utils";

const NAME_SHORT_VALUE = "Short";
const NAME_LONG_VALUE = "Long";
let confirmation_object = {
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    deletedTitle: "Deleted!",
    deletedText: "Your inputs has been deleted.",
}


export default function PositionType({ data }) {
    const { t } = useTranslation();
    confirmation_object.title = t(confirmation_object.title)
    confirmation_object.text = t(confirmation_object.text)
    confirmation_object.confirmButtonText = t(confirmation_object.confirmButtonText)
    confirmation_object.cancelButtonText = t(confirmation_object.cancelButtonText)
    confirmation_object.deletedTitle = t(confirmation_object.deletedTitle)
    confirmation_object.deletedText = t(confirmation_object.deletedText)

    function handleChangeLong(e) {
        //* check if there is any change
        if (data.islong === true) return  //* we set is long type to TRUE
        data.Executed.length === 0 ?
            removeInputsAndOutputs(data, true) :
            confirmationOfDeleteExecutions(true);
    }
    function handleChangeShort(e) {
        //* check if there is any change
        if (data.islong === false) return //* we set is long type to FALSE
        data.Executed.length === 0 ?
            removeInputsAndOutputs(data, false) :
            confirmationOfDeleteExecutions(false);
    }
    function removeInputsAndOutputs(data, value) {
        data.setState(value);
        data.removeAllData()
    }

    function confirmationOfDeleteExecutions(val) {//*Confirmation that you will delete all reacords
        const setExecuted = data.setExecuted;
        const setState = data.setState;
        const removeAllData = data.removeAllData;
        utils.confirmationsModal(confirmation_object, [() => setExecuted([]), () => setState(val), () => removeAllData()]);
    }
    return (
        <>
            <ButtonGroup aria-label="Transaction type">
                <ToggleButton type="checkbox" variant="outline-success" onClick={handleChangeLong} checked={data.islong} >{t(NAME_LONG_VALUE)}</ToggleButton>
                <ToggleButton type="checkbox" variant="outline-danger" onClick={handleChangeShort} checked={!data.islong}>{t(NAME_SHORT_VALUE)}</ToggleButton>
            </ButtonGroup>
        </>
    )
}
