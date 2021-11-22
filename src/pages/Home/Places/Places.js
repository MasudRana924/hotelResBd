import React, { useState, useEffect } from 'react';
import { Row, Spinner, Container } from 'react-bootstrap';
import Place from '../Place/Place';


const Places = () => {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        fetch('./places.json')
            .then(res => res.json())
            .then(data => setPlaces(data))
    }, [])
    return (
        <Container className="mt-5 pt-3">

            {
                places.length === 0 ? < div className="spinner"> <Spinner animation="border" className="spinner" />
                </div> :
                    <Row xs={1} md={3}>
                        {
                            places.map(place => <Place
                                key={place.name}
                                place={place}
                            ></Place>)

                        }
                    </Row>
            }
        </Container>
    );
};

export default Places;

