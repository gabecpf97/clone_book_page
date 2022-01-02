import React, { useEffect, useState } from "react";

const Image = ({ url, icon }) => {
    const [name, setName] = useState();

    useEffect(() => {
        if (icon) {
            if (icon === 'small')
                setName('small_icon');
            else 
                setName('icon');
        } else {
            setName('image');
        }   
    }, [icon]);

    return(
        <img 
            src={`http://localhost:5000/media/?name=${url}`} 
            className={name}
            crossOrigin="anonymous"
            alt={name} />
    )
}

export default Image;