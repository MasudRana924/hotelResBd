import React,{useState} from 'react';
import Reviews from '../Reviews/Reviews';
import Footer from '../Shared/Footer/Footer';
import { Container,Row,Col } from 'react-bootstrap';
import HotelsSlicks from '../HotelsSlicks/HotelsSlicks';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import useHotels from './../../Hooks/useHotels';
import { useHistory } from 'react-router-dom';

const Home = ({ aDate, setAdate, dDate, setDdate }) => {
    const {hotels,setDisplayHotels}=useHotels()
    const [name,setName]=useState([])
    const history=useHistory()
    const handleName=e=>{
       const locatio=e.target.value
       setName(locatio)
    }
    const handleSearch=e=>{  
        const adate=aDate.toLocaleDateString()
        const ddate=dDate.toLocaleDateString()
        const matchedHotels = hotels.filter(h => h.location.toLowerCase().includes(name.toLowerCase()));
        console.log(matchedHotels);
        const data={adate,ddate,name}
        setDisplayHotels(matchedHotels)
        if(data){
            console.log(data)            
            history.push('/hotels')
            
         
        }
       

        else{
            alert('Please select a arrival and departure date')
        }
        
        e.preventDefault()
    }
    return (
        <Container fluid>
            <div className="mt-3 w-75 mx-auto search-section">
                <Row xs={1} md={4}>
                    <Col className="search-button mt-1">
                        <input onChange={handleName} className="input" type="text" placeholder="Add city or address" />

                    </Col>
                    <Col className="arrival-section mt-1">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Arrival"
                                value={aDate}
                                onChange={(newValue) => {
                                    setAdate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}

                            />
                        </LocalizationProvider>

                    </Col>
                    <Col className="departure-section mt-1">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Departure"
                                value={dDate}
                                onChange={(newValue) => {
                                    setDdate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Col>
                    <Col className="search-button mt-1">
                        <button onClick={handleSearch} className="btn-search">Search</button>

                    </Col>
                </Row>
            </div>
            <HotelsSlicks ></HotelsSlicks>
            <Reviews></Reviews>
            <Footer></Footer>
        </Container>
    );
};

export default Home;