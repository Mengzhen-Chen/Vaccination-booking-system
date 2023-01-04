import React, {useEffect, useState} from 'react'
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {URL_LOGIN} from './constant'
import {post} from './request'
import toast, { Toaster } from 'react-hot-toast';
import BottomStatus from "./BottomStatus";

const Login = () => {

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const emailChange = e => {
        setPhone('')
        setEmail(e.target.value)
    }
    const phoneChange = e => {
        setEmail('')
        setPhone(e.target.value)
    }
    const passwordChange = e => setPassword(e.target.value)
    useEffect(() => {

    });

    function loginClick () {
        post(URL_LOGIN, {
            username: email || phone,
            password: password
        }, function (response){
            const data  = response.data
            if (data) {
                window.localStorage.setItem("token", data.token)
                window.localStorage.setItem("user", JSON.stringify(data.user))
                window.location = '/my'
            }
        }, function (error) {
            console.info('fail')
            toast.error('Login fail, username or password error.')
        })
    }
    return (
        <div>
            <Toaster />
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address or Phone number</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl value={email} onChange={emailChange} placeholder="Enter Email" />
                        <span>&nbsp;&nbsp;or&nbsp;&nbsp;</span>
                        <FormControl value={phone} onChange={phoneChange} placeholder="Enter Phone" />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={passwordChange} type="password" placeholder="Password" />
                </Form.Group>
                <div>
                    <span>If you don't have one account, you can register by <a href="/signup">click here</a>.</span>
                </div>
                <div style={{marginTop: '15px'}}>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="radio" label="Check here for ensure you are agree the account police of the Portal System" />
                    </Form.Group>
                </div>
                <div style={{textAlign: 'right'}}>
                    <Button onClick={loginClick} variant="primary" type="button">
                        Go next
                    </Button>
                </div>

            </Form>
            <BottomStatus index={1} />
        </div>
    )
}

export default Login
