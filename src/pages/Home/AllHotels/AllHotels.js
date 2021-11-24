import React, { useState } from 'react';
import { Container, Row, Spinner, Col, Form } from 'react-bootstrap';
import AllHotel from '../AllHotel/AllHotel';
import useHotels from './../../Hooks/useHotels';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './AllHotels.css'
import useDate from './../../Hooks/useDate';

const AllHotels = ({ aDate, dDate, setAdate, setDdate }) => {
    const { hotels, displayHotels, setDisplayHotels } = useHotels()
    const [hotelName, setName] = useState([])
    const { name } = useDate()
    const search = <FontAwesomeIcon icon={faSearch} className="search" />
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(1)
    const handlePlus = e => {
        if (adult > 0) {
            setAdult(adult + 1)
        }
    }
    const handleMinus = e => {
        if (adult > 0) {
            setAdult(adult - 1)
        }
    }
    const handleCplus = e => {
        if (child > 0) {
            setChild(child + 1)
        }
    }
    const handleCminus = e => {
        if (child > 0) {
            setChild(child - 1)
        }
    }
    const handleName = e => {
        const locatio = e.target.value
        setName(locatio)
    }
    const handleSearch = e => {
        const matchedHotels = hotels.filter(h => h.location.toLowerCase().includes(hotelName.toLowerCase()));
        console.log(matchedHotels);
        setDisplayHotels(matchedHotels)
        e.preventDefault()
    }
    const handleSingleRoom = e => {
        const room = e.target.value
        const matchedRoom = hotels.filter(h => h.room.toLowerCase().includes(room.toLowerCase()));
        setDisplayHotels(matchedRoom)
    }
    const handleDoubleRoom = e => {
        const droom = e.target.value
        const matchedRoom = hotels.filter(h => h.room.toLowerCase().includes(droom.toLowerCase()));
        setDisplayHotels(matchedRoom)
    }
    const handleStar = e => {
        const star = e.target.value
        const matchedRoom = hotels.filter(h => h.star.toLowerCase().includes(star.toLowerCase()));
        setDisplayHotels(matchedRoom)
    }
    const handleSevenStar = e => {
        const stars = e.target.value
        const matchedRoom = hotels.filter(h => h.star.toLowerCase().includes(stars.toLowerCase()));
        setDisplayHotels(matchedRoom)
    }

    return (
        <Container fluid className="mt-5 pt-5">
            <Row xs={1} md={2}>
                <Col xs={10} md={3}>
                    <div className="checkin-section mt-3 pe-3 ps-3">
                        <p className="text-start fs-4 pt-3">Search</p>

                        <p className="text-start check-in">Destination by name</p>
                        <span className="">{search}</span>
                        <input type="text" onChange={handleName} placeholder={name} />
                        <p className="text-start check-in">Check-in date</p>
                        <div className="date mt-1">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={aDate}
                                    onChange={(newValue) => {
                                        setAdate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}

                                />
                            </LocalizationProvider>

                        </div>
                        <p className="text-start check-in">Check-out date</p>
                        <div className="date mt-1">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker

                                    value={dDate}
                                    onChange={(newValue) => {
                                        setDdate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="adult-child mt-1">
                            <p>Adult</p>
                            <div>
                                <button className="btn-adult-child" onClick={handleMinus}>-</button>
                                <button className="btn-adult-child">{adult}</button>
                                <button onClick={handlePlus} className="btn-adult-child">+</button>
                            </div>

                        </div>
                        <div className="adult-child mt-1">
                            <span>Child <br /><span className="check-in">2-5 age</span> </span>

                            <div>
                                <button className="btn-adult-child" onClick={handleCminus}>-</button>
                                <button className="btn-adult-child">{child}</button>
                                <button className="btn-adult-child" onClick={handleCplus}>+</button>
                            </div>

                        </div>
                        <button onClick={handleSearch} className="search-btn mb-3">Search</button>
                    </div>
                    <div className="filter-section mt-3 ps-3 pe-3">
                        <p className="text-start">Filter by</p>

                        <Form.Group className="mb-3" >
                            <Form.Check type="checkbox" onChange={handleSingleRoom} value="single" label="Single Room"  className="me-5 "/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check type="checkbox" onChange={handleDoubleRoom} value="double" label="Double Room"  className="me-5 "/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check type="checkbox" onChange={handleStar} value="five" label="5 Star"  className="me-5 "/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check type="checkbox" onChange={handleSevenStar} value="seven" label="7 Star"  className="me-5 "/>
                        </Form.Group>

                    </div>

                </Col>
                <Col xs={10} md={9}>
                    {
                        hotels.length === 0 ? < div className="spinner"> <Spinner animation="border" className="spinner" />
                        </div> :
                            <Row xs={1} md={4} className="">
                                {
                                    displayHotels.map(hotel => <AllHotel
                                        key={hotel.name}
                                        hotel={hotel}
                                    ></AllHotel>)
                                }
                            </Row>
                    }
                </Col>
            </Row>


        </Container>
    );
};

export default AllHotels;