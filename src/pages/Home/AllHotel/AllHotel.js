import React, { useState } from 'react';
import Rating from 'react-rating';
import { Col, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import './AllHotel.css'
import useAuth from './../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
const AllHotel = (props) => {
    const { user} = useAuth()
    const { name, img, desc, cost, rating, star, room } = props.hotel
   
    const [show, setShow] = useState(false);
    // modal er function
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const map = <FontAwesomeIcon icon={faStreetView} className="rating" />
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const found=props.hotel
        const adult=props.adult 
        const child=props.child

        data.info = { found, adult, child }
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
                  
                    alert('Orders placed Successfully')
                    reset()

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
                <button onClick={handleShow}   className="btn-confirm" >Confirm Booking</button>
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
                            {/* register your input into the hook by invoking the "register" function */}

                            <input defaultValue={user.displayName} {...register("name")} placeholder="Your name" />
                            {/* include validation with required or other standard HTML validation rules */}
                            <input defaultValue={user.email} {...register("email", { required: true })} placeholder="Your email" />
                            {/* errors will return when field validation fails  */}
                            {errors.email && <span className="error">This field is required</span>}

                            <input defaultValue={props.aDate} {...register("arrival")} placeholder="" />
                            <input defaultValue={props.dDate} {...register("departure")} placeholder="" />

                            <br />
                            <input type="submit" className="input-button" />
                        </form>
                    </Modal.Body>

                </Modal>
            </div>



        </Col >
    );
};

export default AllHotel;