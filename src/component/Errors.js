import React, { useEffect } from "react";
import uniqid from "uniqid";

const Errors = ({errors}) => {
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return(
        <div className="errors">
            {errors.msg && 
                <ul className="errors">
                    {errors.map(err => {
                        return (
                            <li className="err" key={uniqid()}>{err}</li>
                        )
                    })}
                </ul>
            }
            {!errors.msg &&
                <p>{errors}</p>
            }
        </div>
    )
}

export default Errors;