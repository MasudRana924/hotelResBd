import React from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faInstagram, faYoutube, faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons'

import './Footer.css'

const Footer = () => {
    const apple = <FontAwesomeIcon icon={faApple} className="apple-icon " />
    const playstore = <FontAwesomeIcon icon={faGooglePlay}
        className="play-icon " />


    return (
        <Container fluid className="mt-5 pt-5 pb-3  ">
            <div>
                <Row xs={1} md={3}>
                    <Col md={3}>

                    </Col>
                    <Col className="mt-1" md={6}>
                        <div className="me-5">
                            <FontAwesomeIcon icon={faFacebook} className="fb-icon mt-3" />
                            <FontAwesomeIcon icon={faInstagram} className="insta-icon ms-3 mt-3" />
                            <FontAwesomeIcon icon={faYoutube} className="youtube-icon ms-3 mt-3" />
                            <FontAwesomeIcon icon={faGoogle} className="google-icon ms-3 mt-3" />

                        </div>

                        <div className="w-50 mx-auto user-details">

                            <p className="text-start me-1">My account</p>
                            <p className="text-start ms-1 me-1">My address</p>

                            <p className="text-start ms-1 me-1">Helps & Support</p>
                            <p className="text-start ms-1">LogOut</p>
                        </div>
                        <p className="text-center w-100 ">copyright © design in 2021 by
                            <a href="https://github.com/MasudRana924" target="_blank" rel="noopener noreferrer" className="text-decoration-none github-link"> Masud Rana </a>
                        </p>
                        <span> <button className="btn-app"> <span>{apple}</span> <span>Apple Store</span></button> </span>
                        <span> <button className="btn-app"> <span>{playstore}</span> <span>Google Play</span></button> </span>



                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
            </div>



        </Container>
    );
};

export default Footer;