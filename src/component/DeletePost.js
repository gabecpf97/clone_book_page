import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";

/**
 * Component that delete a post
 */
const DeletePost = ({ id, comment, refresh }) => {
    const nav = useNavigate();
    const [errors, setErrors] = useState();
    const [confirm, setConfirm] = useState(false);

    /**
     * Form submit will send DELETE request to backend api and delete the post
     * receieve either success or error message
     * if success go to user's account page
     */
    const handleDelete = async () => {
        const response = await fetch(`https://clone-book-api-29.herokuapp.com/${comment ? 'comment' : 'post'}/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const data = await response.json();
        if (data.err) {
            setErrors(data);
        } else {
            setConfirm(false);
            if (comment) {
                refresh();
            } else {
                nav(`/clone_book_page/user/${JSON.parse(localStorage.user)._id}`);
            }
        }
    }

    const handleConfirm = () => {
        setConfirm(true);
    }

    const handleCancel = () => {
        setConfirm(false);
    }

    return (
        <div className="delete_post">
            {!confirm && <button onClick={() => handleConfirm()}>Delete {comment ? "comment" : "post"}</button>}
            {confirm && 
                <div className="confirmation">
                    <label>Really delete this post?</label>
                    <button onClick={() => handleDelete()}>Yes delete this {comment ? "comment" : "post"}</button>
                    <button onClick={() => handleCancel()}>Cancel</button>
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default DeletePost;