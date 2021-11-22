import React from 'react';
import { Col } from 'react-bootstrap';
import Rating from 'react-rating';


const Experiences = (props) => {
    const { name, img, cost, rating } = props.place
    return (
        <Col className="mt-3">
            <div className="hotel-card">
                <img className="hotel-image" src={img} alt="" />
                <p className="text-start mt-1 fw-bold">{name}</p>
                <div className=" price-rating">
                    <p className="desc text-start text-muted mt-1">${cost} per person</p>

                    <Rating
                        initialRating={rating}
                        emptySymbol="far fa-star rating"
                        fullSymbol="fas fa-star rating"

                        readonly >

                    </Rating>
                </div>

            </div>

        </Col >
    );
};

export default Experiences;