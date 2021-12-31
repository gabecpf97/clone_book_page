import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

const SignUp = () => {
    const nav = useNavigate();
    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirm_password] = useState();
    const [isPrivate, setIsPrivate] = useState(true);
    const [icon, setIcon] = useState();
    const [errors, setErrors] = useState();

    const onFNchange = (e) => {
        setFirst_name(e.target.value);
    }

    const onLNchange = (e) => {
        setLast_name(e.target.value);
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onConfirmChange = (e) => {
        setConfirm_password(e.target.value);
    }

    const onPrivateChange = (e) => {
        setIsPrivate(e.target.value);
    }

    const onIconChange = (e) => {
        setIcon(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', username);
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('email', email);
        data.append('password', password);
        data.append('confirm_password', confirm_password);
        data.append('private', isPrivate);
        data.append('icon', icon);
        const signup_api = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/create`, {
                    method: "POST",
                    body: data,
                });
                const res_data = await response.json();
                if (res_data.errors) {
                    setErrors(res_data.errors);
                } else {
                    localStorage.setItem('token', res_data.token);
                    localStorage.setItem('user', res_data.user);
                    nav('/');
                }
            } catch (err) {
                setErrors('Error in fetching data');
            }
        }
        signup_api();
    }

    return (
        <form className="sign_up" encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
            <FormField field_name="first_name"
                field_type="text"
                field_req={true}
                handleChange={onFNchange} />
            <FormField field_name="last_name"
                field_type="text"
                field_req={true}
                handleChange={onLNchange} />
            <FormField field_name="username"
                field_type="text"
                field_req={true}
                handleChange={onUsernameChange} />
            <FormField field_name="email"
                field_type="text"
                field_req={true}
                handleChange={onEmailChange} />
            <FormField field_name="password"
                field_type="text"
                field_req={true}
                handleChange={onPasswordChange} />
            <FormField field_name="confirm"
                field_type="text"
                field_req={true}
                handleChange={onConfirmChange} />
            <FormField field_name="private"
                field_type="checkbox"
                field_req={false}
                handleChange={onPrivateChange} />
            <FormField field_name="icon"
                field_type="file"
                field_req={false}
                handleChange={onIconChange} />
            <input type="submit" className="submit" value="submit" />
            {errors && <Errors errors={errors}/>}
        </form>
    )
}

export default SignUp;