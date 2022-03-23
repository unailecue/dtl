import React, { useEffect } from 'react'
import { Row, Col, Container, OverlayTrigger, Tooltip, Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSessionStorage } from "../customHooks/useStorage"

const FEEDBACK_BUTTON_TEXT = "Give us your feedback"
const FEEDBACK_TOOLTIP_TEXT = "Your feedback is important for us, if you want to tell us how can we get better please click here and fill the next form";
const FEEDBACK_URL = "https://app.bluecatforms.com/XNNbzW5G/new-form"



export default function Footer() {
    const [Lang, setLang, removeLang] = useSessionStorage(`lang`, "")
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (Lang === "") return
        i18n.changeLanguage(Lang)
    }, []);

    function changeLangEs() {//set lang to spanish
        const langSelected = "es";
        changeLang(langSelected);
    }

    function changeLangEn() {//set lang to english
        const langSelected = "en";
        changeLang(langSelected)
    }

    function changeLang(langSelected) {//this should be called by the button and passing the values but it throw an error
        i18n.changeLanguage(langSelected)
        setLang(langSelected)
    }

    return (
        <div id='footer'>
            <Row>
                <Col>
                    {/* TBD */}
                </Col>
                <Col>
                    <OverlayTrigger
                        key={"top1"}
                        placement={"top"}
                        overlay={
                            <Tooltip id={`tooltip-"top1"`}>
                                {t(FEEDBACK_TOOLTIP_TEXT)}
                            </Tooltip>
                        }>
                        <Button variant="secondary" href={FEEDBACK_URL} target="_blank">{t(FEEDBACK_BUTTON_TEXT)}</Button>
                    </OverlayTrigger>
                </Col>
                <Col>
                    <div className="mb-2">
                        <DropdownButton
                            as={ButtonGroup}
                            id={`dropdown-button-drop-up`}
                            drop={"up"}
                            variant="dark"
                            title="Language">
                            <Dropdown.Item eventKey="1" onClick={changeLangEs}>{t('Spanish')}</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={changeLangEn}>{t('English')}</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Col>

            </Row>
        </div>
    )
}
