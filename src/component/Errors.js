import React, { useEffect } from "react";
import uniqid from "uniqid";

const Errors = ({errors}) => {
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return(
        <div className="errors">
            {errors[0] && 
                <ul className="errors">
                    {errors.map(err => {
                        return (
                            <li className="err" key={uniqid()}>{err.msg}</li>
                        )
                    })}
                </ul>
            }
            {!errors[0] &&
                <p>{errors}</p>
            }
        </div>
    )
}

export default Errors;