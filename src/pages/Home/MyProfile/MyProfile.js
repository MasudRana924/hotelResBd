import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';

import './MyProfile.css'

const MyProfile = () => {
    const { user } = useAuth()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const url = `https://whispering-oasis-97010.herokuapp.com/usersemail?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data)
            })
    }, [])
    return (
        <Container fluid className="mt-5 pt-5">
            <Row xs={1} md={3} className="mt-5 ">

                <Col>

                </Col>

                <Col xs={12} md={4}>

                    <Row xs={1} md={1}>
                        <Col>
                            <div className="profile-section">
                                
                                
                                {
                                    users.map(u => <div>
                                        <img src={`data:image/png;base64,${u.image}`}className="user-image" alt="" />
                                        <Link to="/editprofile" className="edit">
                                        <p >Edit Profile</p></Link>
                                        <p className="text-start">Name:{u.displayName}</p>
                                        <p className="text-start">Email:{u.email}</p>
                                        <p className="text-start">Phone:{u.phoneno}</p>
                                    
                                    </div>)
                                }


                            </div>
                        </Col>
                        <Col></Col>

                    </Row>



                </Col>
                <Col md="3"></Col>

            </Row>


        </Container>
    );
};

export default MyProfile;