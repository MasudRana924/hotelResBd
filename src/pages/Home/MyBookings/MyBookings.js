import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useAuth from './../../Hooks/useAuth';


const MyBookings = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        const url = `https://whispering-oasis-97010.herokuapp.com/mybookings?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [])
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure that you want to delete')
        if (proceed) {
            const url = `https://whispering-oasis-97010.herokuapp.com/mybookings/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('My orders delete successfully ')
                        const remaining = orders.filter(order =>order._id !== id)
                        setOrders(remaining)
                    }
                })
        }
    }
    
    return (
        <Container fluid className="mt-5 pt-5">

            <Row xs={1} md={3}>
                <Col md={2}></Col>

                <Col xs={12} md={8}>
                    <p className="text-start dashboard">My Bookings List </p>
                    <Table striped bordered hover variant="white">
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
                                orders.map(order =>
                                    <tr className="">
                                        <td>{order.info.found.name}</td>
                                        <td>{order.arrival}</td>
                                        <td>{order.departure}</td>
                                        <td>{order.info.adult}</td>
                                        <td>{order.info.child}</td>
                                        <td>${order.info.found.price}</td>
                                      
                                         {
                                          order.status==='Approved'? <td>
                                              <Button variant="success" size="sm">
                                              {order.status}
                                              </Button>
                                          </td> :<td>
                                          <Button 
                                            variant="danger" size="sm" >
                                              {order.status}
                                                </Button>
                                          </td>  
                                        }
                                        <td>
                                            <button onClick={() => handleDelete(order._id)}className="delete-button">
                                                <FontAwesomeIcon icon={faTrashAlt} className="fs-3 text-danger " />
                                            </button>
                                        </td>

                                    </tr>
                                )}


                        </tbody>
                    </Table>


                </Col>
                <Col md={2}></Col>

            </Row>


        </Container>
    );
};

export default MyBookings;