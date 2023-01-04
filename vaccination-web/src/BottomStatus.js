import React from 'react'
import {Col, Row} from "react-bootstrap";

const BottomStatus = (props) => {
    const color = 'rgba(65,140,226,0.41)';
    const bc1 = props.index === 1 ? color : 'transparent'
    const bc2 = props.index === 2 ? color : 'transparent'
    const bc3 = props.index === 3 ? color : 'transparent'
    return (
        <div style={{marginTop: '100px'}}>
            <div>
                <Row style={{border: '1px solid'}}>
                    <Col style={{backgroundColor: bc1, textAlign: 'center', borderRight: '1px solid'}}>
                        Create your Account at first
                    </Col>
                    <Col style={{backgroundColor: bc2, textAlign: 'center', borderRight: '1px solid'}}>
                        Then enter your personal information
                    </Col>
                    <Col style={{backgroundColor: bc3, textAlign: 'center'}}>
                        Book your vaccination
                    </Col>
                </Row>
            </div>

        </div>

    )
}

export default BottomStatus
