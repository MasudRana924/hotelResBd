import React, { useState } from 'react';
import Reviews from '../Reviews/Reviews';
import { Container, Row, Col } from 'react-bootstrap';
import HotelsSlicks from '../HotelsSlicks/HotelsSlicks';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useHistory } from 'react-router-dom';
import './Home.css'
const Home = () => {
    const [location, setLocation] = useState([])
    const [aDate, setAdate] = React.useState(null);
    const [dDate, setDdate] = React.useState(null);

    const history = useHistory()
    const handleLocation = e => {
        const locatio = e.target.value
        setLocation(locatio)
    }
    const handleSearch = e => {
        e.preventDefault()
        const data = { aDate, dDate, location }
        if (data) {
            console.log(data)
            history.push('/hotels')
        }
        else {
            history.push('/home')
        }


    }

    return (
        <Container fluid>
            <div className="search-section">
                <div className="pt-5 w-75 mx-auto ">
                    <Row xs={1} md={4}>

                        <Col className="search-button mt-1">
                            <input onChange={handleLocation} className="input" type="text" placeholder="Add city or address" />
                        </Col>
                        <Col className="arrival-section mt-1">
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
                        </Col>
                        <Col className="departure-section mt-1">
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
                        </Col>
                        <Col className="search-button mt-1">
                            <button onClick={handleSearch} className="btn-search">Search</button>

                        </Col>
                    </Row>
                </div>
            </div>

            <HotelsSlicks ></HotelsSlicks>
            <Reviews></Reviews>

        </Container>
    );
};

export default Home;