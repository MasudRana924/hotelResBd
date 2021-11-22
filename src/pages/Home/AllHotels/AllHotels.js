import React, { useState, useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import AllHotel from '../AllHotel/AllHotel';
import './AllHotels.css'

const AllHotels = () => {
    const [hotels, setHotels] = useState([])
    useEffect(() => {
        fetch('./hotels.json')
            .then(res => res.json())
            .then(data => setHotels(data))
    }, [])
    return (
        <Container fluid className="mt-5 pt-5">
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