import React, { useState } from 'react';
import { Container,Form, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserEdit, faShoppingCart, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import useAuth from './../../../Hooks/useAuth';
const Header = ({ aDate, setAdate, dDate, setDdate }) => {
    const [show, setShow] = useState(false);
    const [SignUpshow, setSignUpShow] = useState(false);
    // modal er function
    const handleClose = () => setShow(false);
    const handleSignUpClose = () => setSignUpShow(false);
    const handleShow = () => setShow(true);
    const handleSignUpShow = () => setSignUpShow(true);
    const history = useHistory()
    const { user, registerUser, error, handleName, handleEmail, handlePass, setUserName, setUser, name, email, pass, setError, setLoading, logInUser, logOut } = useAuth()
    const userp = <FontAwesomeIcon icon={faUser} className="user-icon" />
    const edit = <FontAwesomeIcon icon={faUserEdit} className="user-icon" />
    const sort = <FontAwesomeIcon icon={faShoppingCart} className="user-icon" />
    const review = <FontAwesomeIcon icon={faEdit} className="user-icon" />
    const logout = <FontAwesomeIcon icon={faSignOutAlt} className="user-icon" />

    const saveUser = (email, diaplayName) => {
        const user = { email, diaplayName }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert('Account created successfully')
                }
            })
        handleSignUpClose(true)

    }
    const handleLogin = () => {
        handleShow()
    }
    const handleCloseLogin = () => {
        handleClose(true)
    }
   

    return (
        <Container fluid>
            <Navbar bg="" expand="lg">
                <Container fluid>
                    <Link to="/home" className="nav-brand fs-3 ms-5">HotelRes</Link>
                    <Navbar.Toggle aria-controls="navbarScroll" className="toggle" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-end" >
                        <Nav className="ms-5">
                            <Link to="/home" className="link">Home</Link>
                            <Link className="link">Host your experinece </Link>
                            <Link className="link"> Help</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">

                        {
                            user.email ? <div>

                                <NavDropdown title={user.displayName} id="collasible-nav-dropdown">
                                    <Link className="user-link">{userp} My Profile</Link> <br />
                                    <Link to="/editprofile" className="user-link">{edit}Edit Profile</Link>  <br />
                                    <Link to="/dashboard" className="user-link">{sort}My Orders</Link> <br />
                                    <Link className="user-link">{review}Reviews</Link> <br />
                                    <Link onClick={logOut} className="user-link">{logout}LogOut</Link>
                                </NavDropdown>

                            </div>
                                : <div>
                                    <Link onClick={handleLogin} className="link">Login</Link>
                                    <Link className="link"> <button onClick={handleSignUpShow} className="signup-button"> Sign-Up</button></Link>
                                </div>
                        }



                        <Modal show={SignUpshow} onHide={handleSignUpClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sign-up</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={(event) => {
                                    event.preventDefault()
                                    registerUser(email, pass)
                                        .then(result => {
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
                            </Modal.Body>
                        </Modal>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Log-in</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={(e) => {
                                    e.preventDefault()
                                    logInUser(email, pass)
                                        .then(result => {
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
                                    <p className="text-start">Already haven't a account ? then <span className="text-primary">Signup </span> </p>
                                    <div className="d-flex">
                                        <button onClick={handleCloseLogin} type="submit" className="apply ms-1 mb-3 w-50 ">Login</button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Navbar.Collapse >
                </Container>
            </Navbar>
            
        </Container>
    );
};

export default Header;
