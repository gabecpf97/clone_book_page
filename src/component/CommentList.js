import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";
import DeletePost from "./DeletePost";
import Errors from "./Errors";
import Image from "./Image";
import LikeBtn from "./LikeBtn";
import ShowTime from "./ShowTime";

const CommentList = ({ id, userComment }) => {
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
        if (!userComment) {
            if (reload || !comments)
                fetchComment();
        } else {
            setComments(userComment);
        }
    }, [id, reload, comments, userComment]);

    const refreshIt = () => {
        setReload(true);
    }

    return (
        <div className="comment_list">
            {!userComment &&
                <CreateComment id={id} refresh={refreshIt} />
            }
            {comments && comments.map(comment => {
                return (
                    <li className="comment" key={comment._id}>
                        <Image url={comment.user.icon} icon="small" />
                        <p>{comment.user.username}</p>
                        {userComment &&
                            <Link to={`/post/${comment.belong._id}`}>
                                <p>{comment.message}</p>
                                {comment.media && <Image url={comment.media} />}
                            </Link>
                        }
                        {!userComment &&
                            <div>
                                <p>{comment.message}</p>
                                {comment.media && <Image url={comment.media} />}
                            </div>
                        }
                        <ShowTime date={comment.date} />
                        <LikeBtn id={comment._id} comment="comment"/>
                        {(comment.user._id === JSON.parse(localStorage.user)._id ||
                            comment.belong.user === JSON.parse(localStorage.user)._id) &&
                            !userComment &&
                            <DeletePost id={comment._id} comment={true} refresh={refreshIt} />
                        }
                    </li>
                )
            })}
            {comments && comments.length < 1 &&
                <h2>No comment yet</h2>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default CommentList;