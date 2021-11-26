import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Login.css'
import { Link ,useLocation,useHistory} from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';
const Login = () => {
    const { error, handleEmail, handlePass, email, pass, setError, setLoading, logInUser, } = useAuth()
    const location = useLocation()
    const location_url = location.state?.from || '/home'
    const history = useHistory()
    return (
        <Container fluid className="mt-5 pt-5">
            <Row xs={1} md={3}>
                <Col md={4}></Col>
                <Col md={4}>
                    <div className="login-card">
                        <Form onSubmit={(e) => {
                            e.preventDefault()
                            logInUser(email, pass)
                                .then(result => {
                                    history.push(location_url)
                                    setError('')
                                })
                                .catch(error => {
                                    setError('Email or Password is not valid')
                                })
                                .finally(() =>
                                    setLoading(false)
                                );
                        }}
                        >
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <p className="text-start">Email </p>
                                <Form.Control type="email" placeholder="Enter your email" onBlur={handleEmail} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicPassword">
                                <p className="text-start">Password</p>
                                <Form.Control onBlur={handlePass} type="password" placeholder="Enter your password" />
                                <p className="text-start text-danger"> {error}</p>
                            </Form.Group>
                            <p className="text-start">Already have an account ? <Link to="/signup" className="text-decoration-none create">SignUp </Link></p>
                            <div className="">
                                <button type="submit" className="apply ms-1 mb-3 w-50 ">Login</button>
                            </div>
                        </Form>
                    </div>

                </Col>
                <Col md={4}></Col>
            </Row>

        </Container>
    );
};

export default Login;