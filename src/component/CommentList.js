import React, { useEffect, useState } from "react";
import Errors from "./Errors";
import Image from "./Image";
import LikeBtn from "./LikeBtn";

const CommentList = ({ id }) => {
    const [comments, setComments] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await fetch (`http://localhost:5000/comment_list/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    setErrors(data);
                } else {
                    setComments(data.comments);
                }
            } catch (err) {
                setErrors({err});
            }
        }
        fetchComment();
    }, [id]);

    return (
        <div className="comment_list">
            {comments && comments.map(comment => {
                return (
                    <li className="comment" key={comment._id}>
                        <Image url={comment.user.icon} icon="small" />
                        <p>{comment.user.username}</p>
                        <p>{comment.message}</p>
                        {comment.media && <Image url={comment.media} />}
                        <LikeBtn id={comment._id} comment="comment"/>
                        {comment.comments.length > 0 && 
                            <CommentList id={comment._id} />
                        }
                    </li>
                )
            })}
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default CommentList;