import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import swal from 'sweetalert';
import useAuth from '../../Hooks/useAuth';
import { useParams } from 'react-router';


const Bookings = () => {
    const { hotelId } = useParams()
    const { user } = useAuth()
    const [Adate, setADate] = React.useState(null);
    const [DeptDate, setDeptDate] = React.useState(null);
    const [Adult, setAdult] = useState(1)
    const [Child, setChild] = useState(1)
   

    const { register, handleSubmit, formState: { errors } } = useForm();
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

    const [hotel, setHotel] = useState({})
    useEffect(() => {
        fetch(`https://whispering-oasis-97010.herokuapp.com/hotels/${hotelId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setHotel(data)
            })
    }, [])
    

    const onSubmit = data => {
        data.info = hotel
        data.adult = Adult
        data.child = Child

        data.adate = Adate.toDateString()
        data.ddate = DeptDate.toDateString()
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
                        text: "Booking successfull !",
                        icon: "success",
                        button: "Ok",
                    });
                    
                    data.target.reset()

                }
            })

    }
    
    return (
        <Container fluid className="mt-5 pt-5">
            <Row xs={1} md={3}>
                <Col md={3}></Col>
                <Col md={6}>
                    <form className="shipping-form w-75 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={user.displayName} {...register("name")} className="form-input" placeholder="Your name" />
                        {/* include validation with required or other standard HTML validation rules */}
                        <input defaultValue={user.email} {...register("email", { required: true })} placeholder="Your email" className="form-input" />
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
                    </form></Col>
                <Col md={3}></Col>
            </Row>
            

        </Container>
    );
};

export default Bookings;