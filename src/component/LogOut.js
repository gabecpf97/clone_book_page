import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = ({ handleChange }) => {
    const nav = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        handleChange();
        nav('/log_in');
    }

    return(
        <div className="log_out">
            <h1>Really log out? {JSON.parse(localStorage.user).username}</h1>
            <button className="page" onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default LogOut;