import { useEffect } from "react";
import { useState } from "react"

const useHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [displayHotels, setDisplayHotels] = useState([]);
    useEffect(() => {
        fetch('./hotels.json')
            .then(res => res.json())
            .then(data =>{

             setHotels(data)
             setDisplayHotels(data)
            });
    }, []);
    return {hotels, setHotels,setDisplayHotels,displayHotels};
}

export default useHotels;