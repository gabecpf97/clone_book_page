import React, { useEffect } from "react";
import uniqid from "uniqid";

const Errors = ({errors}) => {
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return(
        <div className="errors">
            {errors.err &&
                <h2>{errors.err}</h2>
            }
            {errors.errors && errors.errors.map(error => {
                return (<p key={uniqid()}>{error.msg}</p>)
            })}
        </div>
    )
}

export default Errors;