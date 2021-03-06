import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

/**
 * component that display a page for user to change account password
 */
const ChangePassword = ({ handleStatus }) => {
    const nav = useNavigate();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [errors, setErrors] = useState();

    useEffect(() =>{
        document.querySelector('head title').textContent = "Change Password";
    }, []);

    // Form control
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const onConfirmChange = (e) => {
        setConfirm(e.target.value);
    }
    
    /**
     *  Form submit will set a PUT request to backend api and either receive
     * success or error messages 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://clone-book-api-29.herokuapp.com/user/${JSON.parse(localStorage.user)._id}/password`, {
            method: "PUT",
            body: JSON.stringify({
                password,
                new_password: newPassword,
                confirm_password: confirm,
            }),
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                "Content-Type" : "application/json",
            }
        });
        const data = await response.json();
        if (data.errors) {
            setErrors(data);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            handleStatus();
            nav('/clone_book_page/log_in');
        }
    }

    return (
        <div className="change_password">
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormField field_name="password" field_type="password"
                    field_req={true} handleChange={onPasswordChange} />
                <FormField field_name="new_password" field_type="text"
                    field_req={true} handleChange={onNewPasswordChange} />
                <FormField field_name="confirm_change" field_type="text"
                    field_req={true} handleChange={onConfirmChange} />
                <input type="submit" value="submit" />
            </form>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default ChangePassword;