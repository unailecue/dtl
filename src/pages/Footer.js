import React from 'react'
import { Row, Col, Container, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Trans } from 'react-i18next';
const FEEDBACK_BUTTON_TEXT = <Trans>Give us your feedback</Trans>
const FEEDBACK_TOOLTIP_TEXT = <Trans>Your feedback is important for us, if you want to tell us how can we get better please click here and fill the next form</Trans>
const FEEDBACK_URL = "https://app.bluecatforms.com/XNNbzW5G/new-form"

export default function Footer() {
    return (
        <div id='footer'>
            <Row>
                <Col>
                    {/* TBD */}
                </Col>
                <Col>
                    {/* TBD */}
                </Col>
                <Col>
                    <OverlayTrigger
                        key={"top1"}
                        placement={"top"}
                        overlay={
                            <Tooltip id={`tooltip-"top1"`}>
                                {FEEDBACK_TOOLTIP_TEXT}
                            </Tooltip>
                        }>
                        <Button variant="secondary" href={FEEDBACK_URL} target="_blank">{FEEDBACK_BUTTON_TEXT}</Button>
                    </OverlayTrigger>
                </Col>
            </Row>
        </div>
    )
}
