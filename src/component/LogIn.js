import React, { useState } from "react";
import FormField from "./FormField";

const LogIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const login_api = async () => {
            try {
                const response = await fetch(`api url`, {
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
                    // handle error of server
                } else {
                    // redirect to home page
                }
            } catch (err) {
                //handle err of fail fetch
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
        <form className="log_in" onSubmit={(e) = handleSubmit(e)}>
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
    )
}

export default LogIn;