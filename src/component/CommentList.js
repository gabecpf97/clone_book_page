import React, { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import Errors from "./Errors";
import Image from "./Image";
import LikeBtn from "./LikeBtn";

const CommentList = ({ id }) => {
    const [comments, setComments] = useState();
    const [errors, setErrors] = useState();
    const [reload, setReload] = useState(false);

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
                    setReload(false);
                }
            } catch (err) {
                setErrors({err});
            }
        }
        if (reload || !comments)
            fetchComment();
    }, [id, reload, comments]);

    const refreshIt = () => {
        setReload(true);
    }

    return (
        <div className="comment_list">
            <CreateComment id={id} refresh={refreshIt} />
            {comments && comments.map(comment => {
                return (
                    <li className="comment" key={comment._id}>
                        <Image url={comment.user.icon} icon="small" />
                        <p>{comment.user.username}</p>
                        <p>{comment.message}</p>
                        {comment.media && <Image url={comment.media} />}
                        <LikeBtn id={comment._id} comment="comment"/>
                    </li>
                )
            })}
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default CommentList;