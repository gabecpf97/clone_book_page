import React, { useEffect, useState } from "react";

const Image = ({ url, icon }) => {
    const [name, setName] = useState();

    useEffect(() => {
        if (icon) {
            if (icon === 'small')
                setName('small_icon icon');
            else 
                setName('large_icon icon');
        } else {
            setName('image');
        }   
    }, [icon]);

    return(
        <img 
            src={`http://localhost:5000/media/?name=${url}`} 
            className={name}
            crossOrigin="anonymous"
            alt={url} />
    )
}

export default Image;