import React, {useEffect, useState} from 'react'
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import BottomStatus from "./BottomStatus";
import {get, post} from "./request";
import {URL_EDIT_PROFILE, URL_MY_PROFILE, URL_SIGNUP} from './constant'

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
const EditProfile = () => {
    const userStr = window.localStorage.getItem("user")
    const user = userStr && JSON.parse(userStr)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [password, setPassword] = useState(undefined)
    const [country, setCountry] = useState(user.country)
    const [state, setState] = useState(user.state)
    const [town, setTown] = useState(user.town)
    const [street, setStreet] = useState(user.street)
    const [postcode, setPostcode] = useState(user.postcode)
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
        post(URL_EDIT_PROFILE, data, function (response) {
            if (response.data) {
                window.location.href = '/my'
            }
        })
    }

    useEffect(() => {
        getMyProfile()
    }, []);

    function getMyProfile () {
        get(URL_MY_PROFILE, function (response) {
            if (response.data) {
                const user = response.data
                window.localStorage.setItem('user', JSON.stringify(user))
                setName(user.name)
                setEmail(user.email)
                setPhone(user.phone)
                setAge(user.age)
                setGender(user.gender)
                setCountry(user.country)
                setState(user.state)
                setTown(user.town)
                setStreet(user.street)
                setPostcode(user.postcode)
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
                <div style={{textAlign: 'right'}}>
                    <Button onClick={signupClick} variant="primary" type="button">
                        Save
                    </Button>
                </div>
            </Form>
            <BottomStatus index={1} />
        </div>
    )
}
export default EditProfile
