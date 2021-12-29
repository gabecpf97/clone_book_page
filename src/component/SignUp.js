import React, { useState } from "react";
import FormField from "./FormField";

const SignUp = () => {
    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirm_password] = useState();
    const [private, setPrivate] = useState(true);

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
        setPrivate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const signup_api = async () => {
            try {
                const response = await fetch(`api url`, {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        first_name,
                        last_name,
                        email,
                        password,
                        confirm_password,
                        private
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const res_data = await response.json();
                if (res_data.err) {
                    // handle server error
                } else {
                    // redirect to home page
                }
            } catch (err) {
                // handle fetch error
            }
        }
        signup_api();
    }

    return (
        <form className="sign_up" onSubmit={(e) => handleSubmit(e)}>
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
                field_req={true}
                handleChange={onPrivateChange} />
            <input type="submit" className="submit" value="submit" />
        </form>
    )
}

export default SignUp;