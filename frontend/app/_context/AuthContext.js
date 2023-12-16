'use client'

import { createContext, useState } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
        'token': '',
        'user': {}
    })

    return (
        < AuthContext.Provider value={{ user, setUser }} >
            {children}
        </AuthContext.Provider >
    )
}

export { AuthContext, AuthProvider };