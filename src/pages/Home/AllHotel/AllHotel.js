import React from 'react';
import Rating from 'react-rating';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import './AllHotel.css'
import { Link } from 'react-router-dom';

const AllHotel = (props) => {
    const {_id, name, img, desc, cost, rating, star, room } = props.hotel
    const map = <FontAwesomeIcon icon={faStreetView} className="rating" />
  
   

    return (
        <Col className="mt-3">
            <div className="hotel-card">
                <img className="hotel-image" src={img} alt="" />
                <p className="mt-1 fw-bold">{name}</p>
                <div className=" price-rating ms-1 me-1">
                    <p className="desc text-start text-muted mt-1">${cost} per nigth</p>
                    <Rating
                        initialRating={rating}
                        emptySymbol="far fa-star rating"
                        fullSymbol="fas fa-star rating"
                        readonly >

                    </Rating>

                </div>
                <div className=" price-rating ms-1 me-1">
                    <p className="desc text-start text-muted mt-1">{star}/star</p>
                    <p className="desc text-start text-muted mt-1">{room} room</p>

                </div>


                <p className="text-start desc ms-1">{map} {desc}</p>
                <Link to={`bookings/${_id}`}>
                <button  className="confirm-btn" >Confirm Booking</button>
                </Link>
            </div>

        </Col >
    );
};

export default AllHotel;