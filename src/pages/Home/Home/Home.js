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

    const [aDate, setAdate] = React.useState(null);
    const [dDate, setDdate] = React.useState(null);
    const [location, setLocation] = useState([])
    const history = useHistory()
    const handleLocation = e => {
        setLocation(e.target.value)
    }
    const handleSearch = e => {
        const data = { aDate, dDate, location }
        if (data) {
            console.log(data)
            history.push('/hotels')
        }
        else {
            alert('please enter location')
        }
        e.preventDefault()

    }

    return (
        <Container fluid>
            <div className="search-section">
                <div className="pt-5 w-75 mx-auto ">
                    <form action="" onSubmit={handleSearch}>
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
                                <input type="submit" value="Search" className="search-button text-center pt-1 fs-4" />

                            </Col>
                        </Row>
                    </form>
                </div>
            </div>

            <HotelsSlicks ></HotelsSlicks>
            <Reviews></Reviews>

        </Container>
    );
};

export default Home;