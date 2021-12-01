import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import './EditProfile.css'
import useAuth from './../../Hooks/useAuth';

const EditProfile = () => {
    const { user } = useAuth()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);

    const handleProfile = (e) => {
        if(!image){
            alert('eneter iamage')
        }
        const formData = new FormData()
        formData.append('name',name)
        formData.append('phone',phone)
        formData.append('address',address)
        formData.append('image',image)
        console.log(name)
        console.log(phone)
        console.log(address)
        console.log(image)
        fetch(`http://localhost:5000/updateuser?email=${user.email}`, {
            method: 'PUT',         
            body:formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Profile Edited succesfully')
                    console.log(data)
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
                                        <Form.Control onChange={e => setName(e.target.value)} type="name" placeholder="Enter name" />

                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 text-start">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control onChange={e => setPhone(e.target.value)} type="number" placeholder="Give even numbers  rating" />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 text-start">
                                        <Form.Label>Your Address</Form.Label>
                                        <Form.Control onChange={e => setAddress(e.target.value)} type="text" placeholder="Give even numbers  rating" />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 text-start">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control onChange={e => setImage(e.target.files[0])} type="file" placeholder="Image" accept="image/*" />
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