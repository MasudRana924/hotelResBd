import { useEffect } from "react";
import { useState } from "react"

const useHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [displayHotels, setDisplayHotels] = useState([]);
    useEffect(() => {
        fetch('https://whispering-oasis-97010.herokuapp.com/hotels')
            .then(res => res.json())
            .then(data =>{

             setHotels(data)
             setDisplayHotels(data)
            });
    }, []);
    return {hotels, setHotels,setDisplayHotels,displayHotels};
}

export default useHotels;