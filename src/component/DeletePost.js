import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Errors from "./Errors";

const DeletePost = () => {
    const id = useParams().id;
    const nav = useNavigate();
    const [errors, setErrors] = useState();

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5000/post/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const data = await response.json();
        if (data.err) {
            setErrors(data);
        } else {
            nav(`/user/${JSON.parse(localStorage.user)._id}`);
        }
    }

    return (
        <div className="delete_post">
            <button onClick={() => handleDelete()}>Delete Post</button>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default DeletePost;