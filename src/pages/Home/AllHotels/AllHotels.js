import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import AllHotel from '../AllHotel/AllHotel';
import './AllHotels.css'
import useAuth from './../../Hooks/useAuth';

const AllHotels = () => {
    const { user } = useAuth()
    const [hotels, setHotels] = useState([])
    const [applys, setApply] = useState([])
    const [displayProducts, setDisplayProducts] = useState([]);

    const search = <FontAwesomeIcon icon={faSearch} className="insta-icon"/>
    useEffect(() => {
        fetch('./hotels.json')
            .then(res => res.json())
            .then(data => {
                setHotels(data)
                setDisplayProducts(data)
            
            })
    }, [])
    useEffect(() => {
        const url = `http://localhost:5000/myapply?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setApply(data)
            })
    }, [])
    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts =hotels.filter(hotel =>hotel.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }
    return (
        <Container fluid className="mt-5 pt-5">

            <div>
                <Row xs={1} md={3}>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <div className="apply-info">
                            <Table variant="white">
                                {
                                    applys.map(apply =>
                                        <tr className="">
                                            <td className="text-end">Dhaka,Bangladesh </td>
                                            <td className="text-end">{apply.adate} - </td>
                                            <td className="text-start">{apply.ddate}   </td>
                                            <td className="text-start">{apply.adult} adults  </td>
                                            <td className="text-start">{apply.children} childs</td>
                                        </tr>
                                    )
                                }

                            </Table>
                            <span>
                                <input onChange={handleSearch} className="input" type="text" placeholder="Add city or address" />
                               <span>{search}</span> </span>
                        </div>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </div>
            {
                hotels.length === 0 ? < div className="spinner"> <Spinner animation="border" className="spinner" />
                </div> :
                    <Row xs={1} md={3} className="w-75 mx-auto">
                        {
                             displayProducts.map(hotel => <AllHotel
                                key={hotel.name}
                                hotel={hotel}
                            ></AllHotel>)
                        }
                    </Row>
            }


        </Container>
    );
};

export default AllHotels;