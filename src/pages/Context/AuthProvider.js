import React, { createContext } from 'react';
import useFirebase from './../Hooks/useFirebase';


export const AuthContext=createContext()
const AuthProvider = (  {children}) => {

    const allText=useFirebase()
    return (
        <AuthContext.Provider value={allText}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;