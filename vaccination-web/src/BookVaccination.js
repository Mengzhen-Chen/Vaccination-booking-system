import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Form, FormControl, InputGroup, ListGroup, Row} from "react-bootstrap";
import BottomStatus from "./BottomStatus";
import "flatpickr/dist/themes/material_green.css"
import Flatpickr from "react-flatpickr";
import {get, post} from "./request";
import {URL_VACCINES, URL_APPOINTMENTS, URL_VACCINATION_PLACE, URL_BOOKING} from './constant'
import moment from "moment"

const BookVaccination = () => {
    const [vaccines, setVaccines] = useState(undefined)
    const [appointments, setAppointments] = useState(undefined)
    const [appointmentMap, setAppointmentMap] = useState(undefined)
    const [appointmentId, setAppointmentId] = useState(undefined)
    const [vaccinationPlaces, setVaccinationPlaces] = useState(undefined)
    const [vaccinationPlaceId, setVaccinationPlaceId] = useState(undefined)
    const [riskLeve, setRiskLeve] = useState(1)
    const [enableMadeDate, setEnableMadeDate] = useState([])
    const [madeDate, setMadeDate] = useState(undefined)
    const [vaccineMap, setVaccineMap] = useState(undefined)
    const [vaccineId, setVaccineId] = useState(undefined)
    const [bookingResult, setBookingResult] = useState(undefined)
    const vaccineIdChange = e => {
        setVaccineId(e.target.value)
        getAppointments(e.target.value)
    }
    const appointmentIdChange = e => {
        setAppointmentId(e.target.value)
        setMadeDateRange(e.target.value, appointmentMap)
        getVaccinationPlaces(e.target.value)
    }
    const vaccinationPlaceIdChange = e => {
        setVaccinationPlaceId(e.target.value)
    }
    const riskLevelChange = e => {
        setRiskLeve(e.target.value)
    }
    const madeDateChange = (value) => {
        setMadeDate(value)
    }
    const setMadeDateRange = (appointmentId, map) => {
        if (!map && !appointmentMap && !appointmentMap[appointmentId]) {
            return false;
        }
        const appointment = map[appointmentId] || appointmentMap[appointmentId]
        const start = moment(appointment.start)
        const end = moment(appointment.end)
        const dates = []
        while (start.isBefore(end)) {
            dates.push(start.format('YYYY-MM-DD'))
            start.add('days', 1)
        }
        setEnableMadeDate(dates)
    }

    useEffect(() => {
        getVaccines()
    }, []);

    function getVaccines() {
        get(URL_VACCINES, function (response) {
            if (response.data) {
                setVaccines(response.data)
                const vaccineMap = {}
                for (const vaccine of response.data) {
                    vaccineMap[vaccine.id] = vaccine
                }
                setVaccineMap(vaccineMap)
                setVaccineId(response.data[0].id)
                getAppointments(response.data[0].id)
            }
        })
    }

    function getAppointments(vaccineId) {
        get(URL_APPOINTMENTS + '?vaccineId=' + vaccineId, function (response) {
            if (response.data) {
                setAppointments(response.data)
                if (response.data && response.data.length > 0) {
                    setAppointmentId(response.data[0].id)
                    getVaccinationPlaces(response.data[0].id)
                    const appointmentMap = {}
                    for (const appointment of response.data) {
                        appointmentMap[appointment.id] = appointment
                    }
                    setAppointmentMap(appointmentMap)
                    setMadeDateRange(response.data[0].id, appointmentMap)
                }
            }
        })
    }

    function getVaccinationPlaces(appointmentId) {
        get(URL_VACCINATION_PLACE + '?appointmentId=' + appointmentId, function (response) {
            if (response.data) {
                setVaccinationPlaces(response.data)
                if (response.data && response.data.length > 0) {
                    setVaccinationPlaceId(response.data[0].id)
                }
            }
        })
    }

    function submitBook() {
        const data = {
            vaccineId,
            vaccinationPlaceId,
            appointmentId,
            madeDate,
            riskLeve
        }
        post(URL_BOOKING, data, function (response) {
            setBookingResult(response.data)
        })
    }
    const user = JSON.parse(window.localStorage.getItem('user'))
    return (
        <div>
            {!bookingResult ? (<Form>
                <Form.Group className="mb-3">
                    <Form.Label>Vaccination Type</Form.Label>
                    <Form.Select onChange={vaccineIdChange} defaultValue={setVaccineId}>
                        {vaccines ? vaccines.map(vaccine => {
                            return (
                                <option value={vaccine.id}>{vaccine.category}</option>
                            )
                        }) : null}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Vaccination Company</Form.Label>
                    <div>
                        <span>
                            {vaccineMap && vaccineId ? vaccineMap[vaccineId].introduction : ''}
                        </span>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Appointment</Form.Label>
                    <Form.Select onChange={appointmentIdChange} defaultValue={appointmentId}>
                        {appointments ? appointments.map(appointment => {
                            return (
                                <option value={appointment.id}>{moment(appointment.start).format('MM-DD-YYYY')} - {moment(appointment.end).format('MM-DD-YYYY')}</option>
                            )
                        }) : null}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <div>
                        <Flatpickr
                            options={{enable: enableMadeDate}}
                            style={{width: '100%'}}
                            data-enable-time
                            onChange={([date]) => {
                                madeDateChange(date);
                            }}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Select onChange={vaccinationPlaceIdChange} defaultValue={vaccinationPlaceId} >
                        {vaccinationPlaces ? vaccinationPlaces.map(vaccinationPlace => {
                            return (
                                <option value={vaccinationPlace.id}>{vaccinationPlace.address}</option>
                            )
                        }) : null}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Option</Form.Label>
                    <Form.Select onChange={riskLevelChange} defaultValue={riskLeve} >
                        <option value="1">High-risk population</option>
                        <option value="2">High-risk occupations</option>
                        <option value="3">Is it the first time</option>
                    </Form.Select>
                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button onClick={submitBook} variant="primary" type="button">
                        Confirm
                    </Button>
                </div>
            </Form>) : (
                <Row>
                    <Col sm={2} style={{textAlign: 'right'}}>
                        <img style={{width: '150px', height: '150px'}} src="/avatar.png" alt="user"/>
                    </Col>
                    <Col>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Vaccination Id</Col>
                                        <Col style={{textAlign: 'right'}}>{user.name} {bookingResult.id}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Vaccination Types</Col>
                                        <Col style={{textAlign: 'right'}}>{bookingResult.vaccineType}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Vaccination Times</Col>
                                        <Col style={{textAlign: 'right'}}>{bookingResult.times}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Vaccination Date and Time</Col>
                                        <Col style={{textAlign: 'right'}}>{moment(bookingResult.madeDate).format('MM/DD/YYYY HH:mm:ss')}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Vaccination Address</Col>
                                        <Col style={{textAlign: 'right'}}>{bookingResult.address}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}

            <BottomStatus index={3} />
        </div>
    )
}

export default BookVaccination
