import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

const LogIn = ({ handleChange }) => {
    const nav = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();

    useEffect(() =>{
        document.querySelector('head title').textContent = "Log In";
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const login_api = async () => {
            try {
                const response = await fetch(`https://clone-book-api-29.herokuapp.com/user/login`, {
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
                    nav('/clone_book_page/');
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
        <div className="container">
            <h1>Welcome to CloneBook log in or sign up to enjoy</h1>
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
                        <div className="btns">
                            <input type="submit" className="submit" value="Log In" />
                            <Link className="page" to="/clone_book_page/sign_up">Sign up</Link>
                        </div>
                </form>
            </div>
            {errors && 
                <Errors errors={errors} />
            }
        </div>
    )
}

export default LogIn;