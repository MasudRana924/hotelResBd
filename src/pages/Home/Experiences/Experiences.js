import React, { useState } from 'react';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';


const Experiences = (props) => {

    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState(null);
    const handleAddReview = (e) => {
        const formData = { rating, review, image }
        fetch('http://localhost:5000/reviews', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Review added succesfully')
                    e.target.reset()
                }
            })
        e.preventDefault()
    }

    return (
        <Container>
            <Row xs={1} md={3}>
                <Col></Col>
                <Col xs={12}>
                    <h2 className=" text-start dashboard" >Review</h2>

                    <div className="">
                        <Form onSubmit={handleAddReview}>

                            <Form.Group as={Col} className="mb-3 text-start">
                                <Form.Label>Give Rating</Form.Label>
                                <Form.Control onChange={e => setRating(e.target.value)} type="number" placeholder="Give even numbers  rating" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Your Feedback</Form.Label>
                                <Form.Control onChange={e => setReview(e.target.value)} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 text-start">
                                <Form.Label>Image</Form.Label>
                                <Form.Control onChange={e => setImage(e.target.files[0])} type="file" placeholder="Image" accept="image/*" />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 text-center">
                                Submit
                            </Button>
                        </Form>

                    </div>
                </Col>
                <Col></Col>
            </Row>

        </Container>
    );
};

export default Experiences;