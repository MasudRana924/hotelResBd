import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useAuth from './../../Hooks/useAuth';
import './MyProfile.css'

const MyProfile = () => {
    const { user } = useAuth()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const url = `http://localhost:5000/usersemail?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data)
            })
    }, [])
    return (
        <Container fluid className="mt-5">
            <Row xs={1} md={3}>

                <Col md="3">

                </Col>

                <Col xs={12} md={6}>

                    <Row xs={1} md={1}>
                        <Col>
                            <div className="profile-section">
                                
                                {
                                    users.map(u => <div>
                                        <img src={u.img} className="user-image" alt="" />
                                        <p>Name:{u.displayName}</p>
                                        <p>Email:{u.email}</p>
                                        <p>Phone:{u.phoneno}</p>
                                    
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