import React from 'react';
import { Container,Row, Spinner } from 'react-bootstrap';
import AllHotel from '../AllHotel/AllHotel';
import useHotels from './../../Hooks/useHotels';

const AllHotels = () => {
    const {hotels,displayHotels}=useHotels()
    return (
        <Container className="mt-5 pt-5">
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
        </Container>
    );
};

export default AllHotels;