import React from 'react';
import { Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStreetView} from '@fortawesome/free-solid-svg-icons'

import './Hotels.css'
const Hotels = (props) => {
    const { name, img, desc, cost, rating } = props.hotel
    const map= <FontAwesomeIcon icon={faStreetView} className="rating"/>
    return (
        <Col className="mt-3">
            <div className="hotel-card">
                <img className="hotel-image" src={img} alt="" />
                <p className="mt-1 fw-bold">{name}</p>
                <div className=" price-rating">
                    <p className="desc text-start text-muted mt-1">${cost} per nigth</p>
                    <Rating
                        initialRating={rating}
                        emptySymbol="far fa-star rating"
                        fullSymbol="fas fa-star rating"
                        readonly >

                    </Rating>

                </div>


                <p className="text-start desc">{map} {desc}</p>

            </div>

        </Col >
    );
};

export default Hotels;