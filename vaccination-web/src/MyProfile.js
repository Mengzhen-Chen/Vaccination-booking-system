import React, {useEffect, useState} from 'react'
import {URL_MY_PROFILE} from './constant'
import {get} from './request'
import {Col, Row, Button} from "react-bootstrap";
import BottomStatus from "./BottomStatus";
import {LinkContainer} from "react-router-bootstrap";

const MyProfile = () => {

    const [user, setUser] = useState(undefined)

    useState(0)

    useEffect(() => {
        getMyProfile()
    }, []);


    function getMyProfile () {
        get(URL_MY_PROFILE, function (response) {
            setUser(response.data)
        })
    }
    return (
        <div>
            <Row>
                <Col style={{textAlign: 'right'}}>
                    <img src="/avatar.png" alt="user" style={{width: '200px', height: '200px'}}/>
                </Col>
                <Col>
                    {user ? <span>
                        hi, {user.firstName} {user.lastName}, Welcome to Vaccination Portal
                        Click below button would transfer you to then special platform.
                    </span> : null}
                </Col>
            </Row>
            {user ? <Row style={{marginTop: '100px'}}>
                <Col style={{textAlign: 'right'}}>
                    <LinkContainer to="/editProfile">
                        <Button>Enter/edit your details</Button>
                    </LinkContainer>
                </Col>
                <Col>
                    <LinkContainer to="/book">
                        <Button>Book your vaccination</Button>
                    </LinkContainer>
                </Col>
            </Row> : null
            }

            <BottomStatus index={2} />
        </div>
    )
}

export default MyProfile
