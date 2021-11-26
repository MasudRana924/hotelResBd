import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link,useLocation,useHistory } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css'

const Signup = () => {
    const { registerUser, error, handleName, handleEmail, handlePass, setUserName, setUser, name, email, pass, setError, setLoading } = useAuth()
    const location = useLocation()
    const location_url = location.state?.from || '/home'
    const history = useHistory()
    const saveUser = (email, diaplayName) => {
        const user = { email, diaplayName }
        fetch('https://whispering-oasis-97010.herokuapp.com/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    toast.success('Login Successfull ', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })


    }

    return (
        <Container fluid className="mt-5 pt-5">
            <Row xs={1} md={3}>
                <Col md={4}></Col>
                <Col md={4}>
                    <div className="signup-card">                  
                    <Form onSubmit={(event) => {
                        event.preventDefault()
                        registerUser(email, pass)
                            .then(result => {
                                history.push(location_url)
                                setError('')
                                const newUser = { email, displayName: name }
                                setUser(newUser)
                                saveUser(email, name)
                                setUserName()
                            })
                            .catch(error => {
                                setError('Enter a valid email')
                            })
                            .finally(() =>
                                setLoading(false)
                            );
                    }} className="w-75 mx-auto">
                        <Form.Group className="mb-1">
                            <Form.Control type="text" placeholder="Enter Your Name" onBlur={handleName} />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Control type="email" placeholder="Enter Your Email" onBlur={handleEmail} />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Control onBlur={handlePass} type="password" placeholder="Enter a Password" />
                            <p className="text-start text-muted"> Password should be more than 6 characters</p>
                            <p className="text-start text-danger"> {error}</p>
                        </Form.Group>
                        <button type="submit" size="sm" className="apply  ms-1 mb-1 w-50 ">Signup</button> <br />
                        <p className="text-start">Already have an account ? <Link to="/login" className="text-decoration-none create">Log-in  </Link></p>
                        <br />
                    </Form>
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </Container>
    );
};

export default Signup;