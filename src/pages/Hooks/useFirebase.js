import { useEffect, useState } from 'react';
import initializeAuthentication from './../Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

initializeAuthentication()
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(false)
       // for name
       const [name, setName] = useState('')
       // for email
       const [email, setEmail] = useState('')
       // for pass 
       const [pass, setPass] = useState('')
       // pass 6 er kom hoile tar jonno state 
       const [error, setError] = useState('')

       // email handle
    const handleEmail = e => {
        setEmail(e.target.value)
    }
    // pass handle
    const handlePass = e => {
        setPass(e.target.value)
    }
    // handle name
    const handleName = event => {
        setName(event.target.value)

    }
     // name 
     const setUserName = () => {
        setLoading(true)
        updateProfile(auth.currentUser, {
            displayName: name,
        }).then(result => {
            // Profile updated!
            // ...
        })
        .finally(() =>
        setLoading(false)
    )
    }

    const auth = getAuth();
    //  register er jonno user create 
    const registerUser = (email, pass) => {
        setLoading(true)
        if (pass.length < 6) {
            setError('pass must be 6 character')
            return
        }
       return createUserWithEmailAndPassword(auth, email, pass)
        
    }
    //  for signin 
    const logInUser = (email, pass) => {
        setLoading(true)
     return   signInWithEmailAndPassword(auth, email, pass)

    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
               
            } else {
                setUser({})
            }
            setLoading(false)
        });
        return unsubscribed

    }, [])
    useEffect(() => {
        fetch(`https://fierce-wildwood-12311.herokuapp.com/users/${user.email}`)
        .then(res=>res.json())
        .then(data=>{
            setAdmin(data.admin)
        })

    }, [user.email])
    const logOut = () => {
        setLoading(true)

        signOut(auth).then(() => {

        }).catch((error) => {

        })
        .finally(() => {
            setLoading(false)
        });;
    }

    return {
        user, registerUser, logInUser, logOut,isLoading,
        setError,error, handleEmail, handlePass,handleName,setUserName, email, pass,setUser,name,admin,setLoading
    }
}
export default useFirebase