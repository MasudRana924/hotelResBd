import React, { useRef } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import './EditProfile.css'
import useAuth from './../../Hooks/useAuth';

const EditProfile = () => {
    const {user}=useAuth()
    const nameRef = useRef()
    const phnRef = useRef()
    const addRef = useRef()
    const imgRef=useRef()
    const handleProfile = (e) => {
        const name = nameRef.current.value
        const phn = phnRef.current.value
        const add= addRef.current.value
        const img=imgRef.current.value

        const profiles= {name,add,phn,img}
        fetch(`http://localhost:5000/updateuser/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(profiles)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount>0) {
                    alert('Profile Edited succesfully')
                    e.target.reset()
                }
            })
        e.preventDefault()
    }
    return (
        <Container fluid className="mt-5">
        <Row xs={1} md={3}>

            <Col md="3">
                
            </Col>

            <Col xs={12} md={6}>
                <h2 className=" text-start" >Edit Profile </h2>
                <Row xs={1} md={1}>
                    <Col>
                        <div className="">
                            <Form onSubmit={handleProfile}>
                                <Form.Group className="mb-3 text-start" >
                                    <Form.Label>Your name</Form.Label>
                                    <Form.Control ref={nameRef}  type="name" placeholder="Enter name" />

                                </Form.Group>
                                <Form.Group as={Col} className="mb-3 text-start">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control ref={phnRef} type="number" placeholder="Give even numbers  rating" />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3 text-start">
                                    <Form.Label>Your Address</Form.Label>
                                    <Form.Control ref={addRef} type="text" placeholder="Give even numbers  rating" />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3 text-start">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control ref={imgRef} type="file" placeholder="Image" accept="image/*" />
                                </Form.Group>


                                <Button variant="primary" type="submit" className="w-100 text-center">
                                    Submit
                                </Button>
                            </Form>

                        </div></Col>
                    <Col></Col>

                </Row>



            </Col>
            <Col md="3"></Col>

        </Row>


    </Container>
    );
};

export default EditProfile;