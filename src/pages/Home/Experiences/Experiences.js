import React, { useState } from 'react';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
import './Experience.css'


const Experiences = (props) => {

    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState(null);
    const handleAddReview = (e) => {
        
        if (!image) {
            return;
        }
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('review', review);
        formData.append('image', image);
        fetch('https://whispering-oasis-97010.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:formData
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
        <Container className="mt-5 experience">
            <Row xs={1} md={3}>
                <Col></Col>
                <Col xs={12}>
                  

                    <div className="experience-card">
                        <Form onSubmit={handleAddReview}>

                            <Form.Group as={Col} className="mb-1 text-start">
                                <Form.Label>Give Rating</Form.Label>
                                <Form.Control onChange={e => setRating(e.target.value)} type="number" placeholder="Give even numbers  rating" />
                            </Form.Group>
                            <Form.Group className="mb-1 text-start" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Your Feedback</Form.Label>
                                <Form.Control onChange={e => setReview(e.target.value)} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-1 text-start">
                                <Form.Label>Image</Form.Label>
                                <Form.Control onChange={e => setImage(e.target.files[0])} type="file" placeholder="Image" accept="image/*" />
                            </Form.Group>

                            <Button  type="submit" className="w-100 text-center apply">
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