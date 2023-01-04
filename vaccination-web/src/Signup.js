import React, {useState} from 'react'
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import BottomStatus from "./BottomStatus";
import {post} from "./request";
import {URL_SIGNUP} from './constant'

const countries = [
    'Australia'
]

const states = {
    'Australia': [
        'New South Wales',
        'Queensland',
        'South Australia',
        'Tasmania',
        'Victoria',
        'Western Australia',
        'Australian Capital Territory',
        'Northern Territory'
    ]
}
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('Male')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('Australia')
    const [state, setState] = useState(states[country][0])
    const [town, setTown] = useState('')
    const [street, setStreet] = useState('')
    const [postcode, setPostcode] = useState('')
    const emailChange = e => {
        setPhone('')
        setEmail(e.target.value)
    }
    const phoneChange = e => {
        setEmail('')
        setPhone(e.target.value)
    }
    const nameChange = e => {setName(e.target.value)}
    const ageChange = e => {setAge(e.target.value)}
    const genderChange = e => {setGender(e.target.value)}
    const passwordChange = e => {setPassword(e.target.value)}
    const countryChange = e => {setCountry(e.target.value)}
    const stateChange = e => {setState(e.target.value)}
    const townChange = e => {setTown(e.target.value)}
    const streetChange = e => {setStreet(e.target.value)}
    const postcodeChange = e => {setPostcode(e.target.value)}

    function signupClick() {
        const data = {
            name,
            age,
            gender,
            password,
            email,
            phone,
            country,
            state,
            town,
            street,
            postcode
        }
        post(URL_SIGNUP, data, function (response) {
            if (response.data) {
                window.location.href = '/login'
            }
        })
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={nameChange} type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control value={age} onChange={ageChange} type="text" placeholder="Enter age" />
                </Form.Group>
                <Form.Group onChange={genderChange} className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <div>
                        <Form.Select defaultValue={gender} onChange={genderChange}>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                            <option value="Female">Female</option>
                            <option value="Not selected">Not selected</option>
                        </Form.Select>
                    </div>
                </Form.Group>
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
                <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Select defaultValue={country} onChange={countryChange}>
                        {countries.map(e => {
                            return (
                                <option value={e}>{e}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue={state} onChange={stateChange}>
                        {states[country].map(e => {
                            return (
                                <option value={e}>{e}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl value={town} onChange={townChange} placeholder="Enter Town" />
                        <FormControl value={street} onChange={streetChange} placeholder="Enter Street" />
                        <FormControl value={postcode} onChange={postcodeChange} placeholder="Enter Postcode" />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="radio" label="Check here for ensure you are agree the account police of the Portal System" />
                </Form.Group>
                <div style={{textAlign: 'right'}}>
                    <Button onClick={signupClick} variant="primary" type="button">
                        Go next
                    </Button>
                </div>
            </Form>
            <BottomStatus index={1} />
        </div>
    )
}
export default Signup
