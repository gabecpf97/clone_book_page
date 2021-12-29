import React, { useState } from "react";
import FormField from "./FormField";

const LogIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return(
        <div className="log_in">
            <form onSubmit={(e) = handleSubmit(e)}>
                <FormField field_name="email"
                    field_type="text"
                    field_req={true}
                    handleChange={onEmailChange} />
            </form>
        </div>
    )
}

export default LogIn;