import React, { useEffect, useState } from "react";
import Errors from "./Errors";

const LikeBtn = ({ id }) => {
    const [status, setStatus] = useState();
    const [list, setList] = useState();
    const [errors, setErrors] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/post/${id}/likes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    setErrors(data);
                } else {
                    setStatus(data.status ? "unlike": "like");
                    setList(data.likes);
                    setLoaded(true);
                }
            } catch (err) {
                setErrors({err: 'Error in fetching please refresh'});
            }
        }
        fetchData();
    }, [id, loaded]);
    
    const handleLike = async () => {
        const response = await fetch (`http://localhost:5000/post/${id}/${status}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }        
        });
        const data = await response.json();
        if (data.err) {
            setErrors(data);
        } else {
            console.log(data);
            setLoaded(false);
        }
    }
    
    return (
        <div className="like_btn">
            {loaded && 
                <div>
                    <label>{list.length}</label>
                    <button onClick={() => handleLike()} >{status}</button>
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default LikeBtn;