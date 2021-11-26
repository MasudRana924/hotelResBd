import {useState}  from 'react'
const useDate = () => { 
    const [name,setName]=useState([])
    
    
    const handleName=e=>{
        const locatio=e.target.value
        setName(locatio)
     }
   
    return {
handleName ,name
    }
}
export default useDate