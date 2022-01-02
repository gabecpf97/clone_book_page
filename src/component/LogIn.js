import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

const LogIn = ({ handleChange }) => {
    const nav = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const login_api = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const res_data = await response.json();
                if (res_data.err) {
                    setErrors(res_data);
                } else {
                    localStorage.setItem('token', res_data.token);
                    localStorage.setItem('user', JSON.stringify(res_data.user));
                    handleChange();
                    nav('/');
                }
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
            }
        }
        login_api();
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return(
        <div className="log_in_div">
            <form className="log_in" onSubmit={(e) => handleSubmit(e)}>
                <FormField field_name="email"
                    field_type="text"
                    field_req={true}
                    handleChange={onEmailChange} />
                <FormField field_name="password"
                    field_type="password"
                    field_req={true}
                    handleChange={onPasswordChange} />
                <input type="submit" className="submit" value="submit" />
            </form>
            {errors && 
                <Errors errors={errors} />
            }
        </div>
    )
}

export default LogIn;