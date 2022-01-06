import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

const SignUp = ({ handleChange }) => {
    const nav = useNavigate();
    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirm_password] = useState();
    const [isPrivate, setIsPrivate] = useState(true);
    const [icon, setIcon] = useState();
    const [description, setDescription] = useState("Hello welcome to my page");
    const [errors, setErrors] = useState();

    useEffect(() =>{
        document.querySelector('head title').textContent = "Sign Up";
    }, []);


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
        setIsPrivate(e.target.checked);
    }

    const onIconChange = (e) => {
        setIcon(e.target.files[0]);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
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
        data.append('description', description);
        const signup_api = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/create`, {
                    method: "POST",
                    body: data,
                });
                const res_data = await response.json();
                if (res_data.errors || res_data.err) {
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
        signup_api();
    }

    return (
        <form className="sign_up container" encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
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
            <FormField field_name="description"
                field_type="textarea"
                field_req={false}
                handleChange={onDescriptionChange}
                value={description} />
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