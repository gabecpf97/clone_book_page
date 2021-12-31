import React from "react";
// import uniqid from "uniqid";

const Errors = ({errors}) => {
    return(
        // <ul className="errors">
        //     {errors.map(err => {
        //         return (
        //             <li className="err" key={uniqid()}>{err}</li>
        //         )
        //     })}
        // </ul>
        <p>{errors}</p>
    )
}

export default Errors;