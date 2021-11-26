import React, { useState } from 'react';
import Rating from 'react-rating';
import { Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import './AllHotel.css'
import useAuth from './../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import swal from 'sweetalert';


const AllHotel = (props) => {
    const { user } = useAuth()
    const { name, img, desc, cost, rating, star, room } = props.hotel
    const [show, setShow] = useState(false);
    // modal er function
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Adate, setADate] = React.useState(null);
    const [DeptDate, setDeptDate] = React.useState(null);
   
    const [Adult, setAdult] = useState(1)
    const [Child, setChild] = useState(1)
    const map = <FontAwesomeIcon icon={faStreetView} className="rating" />
    const { register, handleSubmit, formState: { errors }} = useForm();
    const handlePlus = e => {
        if (Adult > 0) {
            setAdult(Adult + 1)
        }
        e.preventDefault()
    }
    const handleMinus = e => {
        if (Adult > 0) {
            setAdult(Adult - 1)
        }
        e.preventDefault()
    }
    const handleCplus = e => {
        if (Child > 0) {
            setChild(Child + 1)
        }
        e.preventDefault()
    }
    const handleCminus = e => {
        if (Child > 0) {
            setChild(Child - 1)
        }
        e.preventDefault()
    }

    const onSubmit = data => {
        const found = props.hotel
        data.adult = Adult
        data.child = Child
        data.info = found
        data.adate=Adate.toDateString()
        data.ddate=DeptDate.toDateString()
        data.status = 'pending'
        fetch('https://whispering-oasis-97010.herokuapp.com/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {

                    swal({
                        title: "Success",
                        text: "You order placed successfully !",
                        icon: "success",
                        button: "Ok",
                    });


                }
            })
        handleClose(true)

    }
    return (
        <Col className="mt-3">
            <div className="hotel-card">
                <img className="hotel-image" src={img} alt="" />
                <p className="mt-1 fw-bold">{name}</p>
                <div className=" price-rating ms-1 me-1">
                    <p className="desc text-start text-muted mt-1">${cost} per nigth</p>
                    <Rating
                        initialRating={rating}
                        emptySymbol="far fa-star rating"
                        fullSymbol="fas fa-star rating"
                        readonly >

                    </Rating>

                </div>
                <div className=" price-rating ms-1 me-1">
                    <p className="desc text-start text-muted mt-1">{star}/star</p>
                    <p className="desc text-start text-muted mt-1">{room} room</p>

                </div>


                <p className="text-start desc ms-1">{map} {desc}</p>
                <button onClick={handleShow} className="confirm-btn" >Confirm Booking</button>
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
                            <input defaultValue={user.displayName} {...register("name")} className="form-input" placeholder="Your name" />
                            {/* include validation with required or other standard HTML validation rules */}
                            <input defaultValue={user.email} {...register("email", { required: true })} placeholder="Your email"className="form-input" />
                            {/* errors will return when field validation fails  */}
                            {errors.email && <span className="error">This field is required</span>}
                            <div className="d-flex mt-3">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Arrival"
                                        value={Adate}
                                        onChange={(newValue) => {
                                            setADate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter=
                                    {AdapterDateFns}>
                                    <DatePicker
                                        label="Departure"
                                        value={DeptDate}
                                        onChange={(newValue) => {
                                            setDeptDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="adult-child mt-1">
                                <p>Adult</p>
                                <div>
                                    <button className="btn-adult-child" onClick={handleMinus}>-</button>
                                    <button className="btn-adult-child">{Adult}</button>
                                    <button onClick={handlePlus} className="btn-adult-child">+</button>
                                </div>

                            </div>

                            <div className="adult-child mt-1">
                                <span>Child <br /><span className="check-in">2-5 age</span> </span>

                                <div>
                                    <button className="btn-adult-child" onClick={handleCminus}>-</button>
                                    <button className="btn-adult-child">{Child}</button>
                                    <button className="btn-adult-child" onClick={handleCplus}>+</button>
                                </div>

                            </div>


                            <br />
                            <input type="submit" className="confirm-btn mt-1" />
                        </form>
                    </Modal.Body>

                </Modal>
            </div>
        </Col >
    );
};

export default AllHotel;