import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const nav = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        nav('/log_in');
    }

    return(
        <button className="page" onClick={handleLogOut}>Log out</button>
    )
}

export default LogOut;