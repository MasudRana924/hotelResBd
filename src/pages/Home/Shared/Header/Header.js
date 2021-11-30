import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserEdit, faShoppingCart, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import useAuth from './../../../Hooks/useAuth';
const Header = ({ aDate, setAdate, dDate, setDdate }) => {
    const { user,  logOut } = useAuth()
    const userp = <FontAwesomeIcon icon={faUser} className="user-icon" />
    const edit = <FontAwesomeIcon icon={faUserEdit} className="user-icon" />
    const sort = <FontAwesomeIcon icon={faShoppingCart} className="user-icon" />
    const review = <FontAwesomeIcon icon={faEdit} className="user-icon" />
    const logout = <FontAwesomeIcon icon={faSignOutAlt} className="user-icon" />

    return (
        <Container fluid>
            <Navbar bg="" expand="lg">
                <Container fluid>
                    <Link to="/home" className="nav-brand fs-3 ms-5">HotelRes</Link>
                    <Navbar.Toggle aria-controls="navbarScroll" className="toggle" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-end" >
                        <Nav className="ms-5">
                            <Link to="/home" className="link">Home</Link>
                            <Link to="/reviews" className="link">Host your experinece </Link>
                            <Link className="link"> Help</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">

                        {
                            user.email ? <div>

                                <NavDropdown title={user.displayName} id="collasible-nav-dropdown" className="me-3">
                                    <Link to="/myprofile" className="user-link">{userp} My Profile</Link> <br />
                                    <Link to="/editprofile" className="user-link">{edit}Edit Profile</Link>  <br />
                                    <Link to="/mybookings" className="user-link">{sort}My Bookings</Link> <br />
                                    <Link to="/reviews" className="user-link">{review}Reviews</Link> <br />
                                    <Link onClick={logOut} className="user-link">{logout}LogOut</Link>
                                </NavDropdown>

                            </div>
                                : <div>
                                    <Link to="/login" className="link">Login</Link>
                                    <Link to="/signup" className="link">
                                       <button  className="signup-button"> Sign-Up</button></Link>
                                </div>
                        }
                    </Navbar.Collapse >
                </Container>
            </Navbar>

        </Container>
    );
};

export default Header;
