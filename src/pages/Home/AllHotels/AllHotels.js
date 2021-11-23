import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { getStoredCart } from '../../Utilities/FakeDb';
import AllHotel from '../AllHotel/AllHotel';
import './AllHotels.css'

const AllHotels = () => {
    const [hotels, setHotels] = useState([])
    useEffect(() => {
        fetch('./hotels.json')
            .then(res => res.json())
            .then(data => setHotels(data))
    }, [])
    const data=getStoredCart()
    return (
        <Container fluid className="mt-5 pt-5">

            <div>
                <Row xs={1} md={3}>
                    <Col md={3}></Col>
                    <Col md={6}>
                      <h1>{data.aDate}</h1>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </div>
            {
                hotels.length === 0 ? < div className="spinner"> <Spinner animation="border" className="spinner" />
                </div> :
                    <Row xs={1} md={3} className="w-75 mx-auto">
                        {
                            hotels.map(hotel => <AllHotel
                                key={hotel.name}
                                hotel={hotel}
                            ></AllHotel>)
                        }
                    </Row>
            }


        </Container>
    );
};

export default AllHotels;