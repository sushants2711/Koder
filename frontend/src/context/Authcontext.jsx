import React, { createContext, useContext, useState } from 'react'

export const Authcontext = createContext();

export const allAuthConetxt = () => useContext(Authcontext);

export const AuthcontextProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    const setDataOnLocalStorage = (name, email) => {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    };

    const fetchDataFromLocalStorage = () => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");

        setUserName(name);
        setUserEmail(email);
    };

    const deleteDataFromLocalStorage = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        setUserName(null);
        setUserEmail(null)
    }

    return (
        <Authcontext.Provider value={{ userName, userEmail, setDataOnLocalStorage, fetchDataFromLocalStorage, deleteDataFromLocalStorage }}>
            {children}
        </Authcontext.Provider>
    )
}