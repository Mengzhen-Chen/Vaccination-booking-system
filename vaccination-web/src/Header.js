import React from 'react'
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const CurrentUser = () => {
    function logout () {
        window.localStorage.clear()
        window.location = '/login'
    }
    const userStr = window.localStorage.getItem('user')
    if (userStr) {
        const user = JSON.parse(userStr)
        return (
            <Stack gap={2} className="col-md-5 mx-auto" style={{textAlign: 'center'}}>
                <div style={{width: '100%'}}>
                    <img alt="" src="/avatar.png" style={{width: '50px', height: '50px'}} />
                </div>
                <span>
                    Hello, <a href="/my">{user.name}</a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="#" onClick={logout}>Logout</a>
                </span>
            </Stack>
        )
    }
}

const LoginButton = () => {
    return (
        <LinkContainer to="/login">
            <Button className="btn-sm">Login</Button>
        </LinkContainer>
    )
}

const Header = () => {
    return (
        <div style={{backgroundColor: 'beige', padding: '10px', margin: '0 0 20px 0px', boxShadow: 'rgb(0 0 0 / 10%) 4px 8px 16px 0px'}}>
            <Row>
                <Col style={{height: '100%',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <Stack gap={2} className="col-md-5 mx-auto" style={{textAlign: 'center'}}>
                        <div style={{width: '100%'}}>
                            <img alt="" src="home.png" style={{width: '30px', height: '30px'}} />
                        </div>
                        <LinkContainer to="/">
                            <span>Home</span>
                        </LinkContainer>
                    </Stack>
                </Col>
                <Col>
                    <Stack gap={2} className="col-md-5 mx-auto" style={{textAlign: 'center'}}>
                        <div style={{width: '100%'}}>
                            <img alt="" src="handshake.png" style={{width: '30px', height: '30px'}} />
                        </div>
                        <span>Vaccination Portal</span>
                    </Stack>
                </Col>
                <Col>
                    <div style={{height: '100%',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {window.localStorage.getItem("user") ? <CurrentUser /> : <LoginButton />}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Header
