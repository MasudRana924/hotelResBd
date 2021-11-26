import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStreetView, faHotel } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Rating from 'react-rating';
import './HotelsSlicks.css'

const HotelsSlicks = ({ aDate, setAdate, dDate, setDdate }) => {
    const [hotels, setHotels] = useState([])

    const map = <FontAwesomeIcon icon={faStreetView} className="rating" />
    const arrow = <FontAwesomeIcon icon={faHotel} className="arrow" />
    useEffect(() => {
        fetch('https://whispering-oasis-97010.herokuapp.com/hotels')
            .then(res => res.json())
            .then(data => {

                setHotels(data)

            })
    }, [])

    let Rsettings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,

                }
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]
    };
    return (
        <Container className="mt-5" >
            <div className="hotel-slicks mt-5">
                <h3 className="text-start">{arrow} Hotels</h3>
                {
                    hotels.length === 0 ? < div className="spinner"> <Spinner animation="border" className="spinner" />
                    </div> : <Slider {...Rsettings}>
                        {
                            hotels.map(hotel => (
                                <div className="" >
                                    <div className="hotels-card ms-1">
                                        <img className="hotel-image" src={hotel.img} alt="" />
                                        <p className="mt-1 fw-bold">{hotel.name}</p>
                                        <div className=" price-rating ms-1 me-1">
                                            <p className="desc text-start text-muted mt-1">${hotel.cost} per nigth</p>
                                            <Rating
                                                initialRating={hotel.rating}
                                                emptySymbol="far fa-star rating"
                                                fullSymbol="fas fa-star rating"
                                                readonly >
                                            </Rating>
                                        </div>
                                        <p className="text-start desc ms-1">{map} {hotel.desc}</p>
                                    </div>
                                </div>

                            ))
                        }
                  </Slider>
                }
            </div>
        </Container>
    );
};

export default HotelsSlicks;