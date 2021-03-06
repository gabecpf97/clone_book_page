import React from "react";
import "../style/formfield.css";

const FormField = ({ field_name, field_type, field_req, handleChange, value }) => {

    return(
        <div className="field">
            <label htmlFor={field_name}>{field_name}</label>
            {field_type !== 'textarea' &&
                <input type={field_type} required={field_req} name={field_name}
                    value={value} onChange={(e) => handleChange(e)} />
            }
            {field_type === 'textarea' &&
                <textarea name="field_name" value={value} onChange={(e) => handleChange(e)} />
            }
        </div>
    )
}

export default FormField;