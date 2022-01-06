import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";

const DeleteUser = ({ handleChange }) => {
    const user = JSON.parse(localStorage.user);
    const nav = useNavigate();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();

    useEffect(() =>{
        document.querySelector('head title').textContent = "Delete Account";
    }, []);


    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
    
    const handleClicked = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/user/${user._id}`, {
            method: "DELETE",
            body: JSON.stringify({password}),
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                "Content-Type" : "application/json",
            }
        });
        const data = await response.json();
        if (data.err) {
            setErrors(data);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            handleChange();
            nav('/log_in');
        }
    }

    return (
        <div className="delete_user">
            <h1>{user.username}, you really delete this account?</h1>
            <form onSubmit={(e) => handleClicked(e)}>
                <label>Password: </label>
                <input type="password" onChange={(e) => onPasswordChange(e)}/>
                <input type="submit" value="Delete" />
            </form>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default DeleteUser;