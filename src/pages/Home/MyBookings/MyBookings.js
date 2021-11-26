import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useAuth from './../../Hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyBookings = () => {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const tostify = () => {
        toast.success('Deleted Successfull ', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    useEffect(() => {
        const url = `https://whispering-oasis-97010.herokuapp.com/mybookings?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })
    }, [])
    const handleDelete = id => {
        const url = `https://whispering-oasis-97010.herokuapp.com/mybookings/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                     tostify()
                    const remaining = bookings.filter(booking => booking._id !== id)
                    setBookings(remaining)
                }
            })

    }

    return (
        <Container fluid className="mt-5 pt-5">
            <Row xs={1} md={3}>
                <Col md={1}></Col>
                <Col xs={12} md={10}>
                    <p className="text-start dashboard">My Bookings List </p>
                    <Table striped bbookinged hover variant="white">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Arrival</th>
                                <th>Departure</th>
                                <th>Adult</th>
                                <th>Child</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                bookings.map(booking =>
                                    <tr className="">
                                        <td>{booking.info.name}</td>
                                        <td>{booking.adate}</td>
                                        <td>{booking.ddate}</td>
                                        <td>{booking.adult}</td>
                                        <td>{booking.child}</td>
                                        <td>${booking.info.cost}</td>

                                        {
                                            booking.status === 'Approved' ? <td>
                                                <Button variant="success" size="sm">
                                                    {booking.status}
                                                </Button>
                                            </td> : <td>
                                                <Button
                                                    variant="danger" size="sm" >
                                                    {booking.status}
                                                </Button>
                                            </td>
                                        }
                                        <td>
                                            <button onClick={() => handleDelete(booking._id)} className="delete-button">
                                                <FontAwesomeIcon icon={faTrashAlt} className="fs-3 text-danger " />
                                            </button>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </Table>
                </Col>
                <Col md={1}></Col>
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

export default MyBookings;