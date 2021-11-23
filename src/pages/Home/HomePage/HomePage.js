import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import './HomePage.css'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';
import Hotels from '../Hotels/Hotels';
import Experiences from '../Experiences/Experiences';
import useAuth from './../../Hooks/useAuth';

const HomePage = () => {
    const {user}=useAuth()
    const email=user.email
    const [places, setPlaces] = useState([])
    const [hotels, setHotels] = useState([])
    const [aDate, setAdate] = React.useState(null);
    const [dDate, setDdate] = React.useState(null);
    const search = <FontAwesomeIcon icon={faSearch} />
    const arrow = <FontAwesomeIcon icon={faArrowRight} className="rating" />
    const [plus, setPlus] = useState(0)
    const [children, setChildren] = useState(1)
    const [adult, setAdult] = useState(1)
    const history = useHistory()
    const handleAplus = e => {

        setAdult(adult + 1)
        e.preventDefault();
    }
    const handleAminus = e => {
        if (adult > 0) {
            setAdult(adult - 1)
        }
        e.preventDefault();
    }
    const handleCplus = e => {
        setChildren(children + 1)
        e.preventDefault();
    }
    const handleCminus = e => {
        if (children > 0) {
            setChildren(children - 1)
        }
        e.preventDefault();
    }
    const handlePlus = (e) => {
        setPlus(plus + 1)
        e.preventDefault();
    }
    const handleMinus = e => {
        if (plus > 0) {
            setPlus(plus - 1)
        }
        e.preventDefault();
    }

    useEffect(() => {
        fetch('./hotels.json')
            .then(res => res.json())
            .then(data => setHotels(data.slice(0, 3)))
    }, [])
    useEffect(() => {
        fetch('./places.json')
            .then(res => res.json())
            .then(data => setPlaces(data.slice(0, 3)))
    }, [])

    const handleApply = e => {
      const  adate=aDate.toLocaleDateString()
      const  ddate=dDate.toLocaleDateString()
        const data = {email, adult, children, plus,adate, ddate}
        fetch('http://localhost:5000/postapply', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    
                    history.push('/hotels')
                }

                else {
                    alert('please enter arrival date ')
                }
            })

        e.preventDefault()
    }
    return (
        <Container fluid className="mt-5 pt-5">
            <Row xs={1} md={2}>
                <Col md={5}>
                    <h4 className="text-start ms-5">Where do you want to go</h4>
                    <div className="location-card w-75 mx-auto pt-3">
                        <Card>
                            <p className="text-start fw-bold  ms-3">Location</p>
                            <Card.Body className="text-start fw-bold">
                                <input className="input" type="text" placeholder="Add city or address" />
                            </Card.Body>

                        </Card>

                    </div>
                    <form onSubmit={handleApply} className="w-75 mx-auto">
                        <div className="mt-1 pt-1 d-flex">
                            <div className=" me-1">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Arrival"
                                        value={aDate}
                                        onChange={(newValue) => {
                                            setAdate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Departure"
                                        value={dDate}
                                        onChange={(newValue) => {
                                            setDdate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="mt-1 pt-1">
                            <Card>
                                <span className="text-start text-muted ms-3 fs-6">Guest</span>
                                <p className="pt-3 text-start ms-3 guest pb-3">{adult} Adults , {children} Child , {plus} Babies</p>
                                <Card.Body>
                                    <div className="plus-minus">
                                        <p>Adults</p>
                                        <div className="number">
                                            <button onClick={handleAminus} className="minus">-</button>
                                            <input type="text" value={adult} />
                                            <button onClick={handleAplus} className="plus">+</button>
                                        </div>
                                    </div>
                                    <div className="plus-minus mt-3">
                                        <span className="text-start">Children <br />
                                            <span className="child text-muted">Age 2-10</span>  </span>

                                        <div className="number">
                                            <button onClick={handleCminus} className="minus">-</button>
                                            <input type="text" value={children} />
                                            <button onClick={handleCplus} className="plus">+</button>
                                        </div>
                                    </div>
                                    <div className="plus-minus mt-3">
                                        <span className="text-start">Babies <br />
                                            <span className="child text-muted">Younger than 2-10</span>  </span>

                                        <div className="number">
                                            <button onClick={handleMinus} className="minus">-</button>
                                            <input type="text" value={plus} />
                                            <button onClick={handlePlus} className="plus">+</button>
                                        </div>
                                    </div>
                                    <button size="sm" className="mt-1 apply ">APPLY</button>
                                </Card.Body>

                            </Card>
                        </div>

                    </form>
                    <button size="sm" className=" search w-75 mx-auto mt-1 ">{search} Search</button>
                </Col>
                <Col md={7}>
                    <div>
                        <div className="hotel-header">
                            <h3 className="">Hotels</h3>
                            <Link to="/hotels" className="link"><p>See all {arrow}</p></Link>
                        </div>
                        {
                            hotels.length === 0 ? < div className="spinner"> <Spinner animation="border" className="spinner" />
                            </div> :
                                <Row xs={1} md={3}>
                                    {
                                        hotels.map(hotel => <Hotels
                                            key={hotel.name}
                                            hotel={hotel}
                                        ></Hotels>)
                                    }
                                </Row>
                        }

                    </div>
                    <div>
                        <div className="hotel-header mt-5 pt-5">
                            <h3 className="">Places</h3>
                            <Link to="places" className="link"><p>See all {arrow}</p></Link>
                        </div>
                        {
                            places.length === 0 ? < div className="spinner"> <Spinner animation="border" className="spinner" />
                            </div> :
                                <Row xs={1} md={3}>
                                    {
                                        places.map(place => <Experiences
                                            key={place.name}
                                            place={place}
                                        ></Experiences>)
                                    }
                                </Row>
                        }

                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default HomePage;