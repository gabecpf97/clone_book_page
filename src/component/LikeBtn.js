import React, { useEffect, useState } from "react";
import Errors from "./Errors";
import "../style/likeBtn.css";

const LikeBtn = ({ id, comment }) => {
    const [status, setStatus] = useState();
    const [list, setList] = useState();
    const [errors, setErrors] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://clone-book-api-29.herokuapp.com/${comment ? 'comment': 'post'}/${id}/likes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (isMounted) {
                    if (data.err) {
                        setErrors(data);
                    } else {
                        setStatus(data.status ? "unlike": "like");
                        setList(data.likes);
                        setLoaded(true);
                    }
                }
            } catch (err) {
                setErrors({err: 'Error in fetching please refresh'});
            }
        }
        let isMounted = true;
        fetchData();
        return () => {isMounted = false}
    }, [id, loaded, comment]);
    
    const handleLike = async () => {
        const response = await fetch (`https://clone-book-api-29.herokuapp.com/${comment ? 'comment': 'post'}/${id}/${status}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }        
        });
        const data = await response.json();
        if (data.err) {
            setErrors(data);
        } else {
            setLoaded(false);
        }
    }
    
    return (
        <div className="like_btn">
            {loaded && 
                <div className="like_btn">
                    <label>{list.length}</label>
                    <button onClick={() => handleLike()} >{status}</button>
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default LikeBtn;