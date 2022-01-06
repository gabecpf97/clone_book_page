import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = ({ handleChange }) => {
    const nav = useNavigate();

    useEffect(() =>{
        document.querySelector('head title').textContent = "Log Out";
    }, []);


    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        handleChange();
        nav('/log_in');
    }

    return(
        <div className="log_out container">
            <h1>Really log out? {JSON.parse(localStorage.user).username}</h1>
            <button className="page" onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default LogOut;