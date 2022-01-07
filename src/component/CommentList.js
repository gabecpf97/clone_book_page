import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";
import DeletePost from "./DeletePost";
import Errors from "./Errors";
import Image from "./Image";
import LikeBtn from "./LikeBtn";
import ShowTime from "./ShowTime";
import "../style/commentlist.css";

const CommentList = ({ id, userComment }) => {
    const [comments, setComments] = useState();
    const [errors, setErrors] = useState();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await fetch (`https://clone-book-api-29.herokuapp.com/comment_list/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (isMounted) {
                    if (data.err) {
                        setErrors(data);
                    } else {
                        setComments(data.comments);
                        setReload(false);
                    }
                }
            } catch (err) {
                setErrors({err});
            }
        }
        let isMounted = true;
        if (!userComment) {
            if (reload || !comments)
                fetchComment();
        } else {
            setComments(userComment);
        }

        return () => {isMounted = false}
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
                            <Link to={`/clone_book_page/post/${comment.belong._id}`}>
                                <p>{comment.message}</p>
                                <div className="frame">
                                    {comment.media && <Image url={comment.media} />}
                                </div>
                            </Link>
                        }
                        {!userComment &&
                            <div>
                                <p>{comment.message}</p>
                                <div className="frame">
                                    {comment.media && <Image url={comment.media} />}
                                </div>
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