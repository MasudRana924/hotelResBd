import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
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
                    <Link to="/login" className="link">Login</Link>
                    <Link to="/signup" className="link"> <button className="signup-button"> Sign-Up</button></Link>
                </Navbar.Collapse >
            </Container>
        </Navbar>
    );
};

export default Header;
