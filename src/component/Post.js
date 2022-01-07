import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Errors from "./Errors";
import { Link } from "react-router-dom";
import LikeBtn from "./LikeBtn";
import DeletePost from "./DeletePost";
import CommentList from "./CommentList";
import Image from "./Image";
import ShowTime from "./ShowTime";
import "../style/post.css";

const Post = () => {
    const id = useParams().id;
    const [post, setPost] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await fetch(`https://clone-book-api-29.herokuapp.com/post/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (isMounted) {
                    if (data.err) {
                        setErrors(data);
                    } else {
                        setPost(data.post);
                    }
                }
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
            }
        }
        document.querySelector('head title').textContent = "Post";
        let isMounted = true;
        fetchPost();
        return () => {isMounted = false}
    }, [id]);

    return(
        <div className="container">
            {post &&
                <div className="post_div">
                    <div className="post_detail">
                        <Link className="user_display" to={`/clone_book_page/user/${post.user._id}`}>
                                <Image url={post.user.icon} icon="small" />
                                <p>{post.user.username}</p>
                        </Link>
                        <p className="post_msg">{post.message}</p>
                        {post.media[0] && 
                            <div className="frame">
                                <Image url={post.media[0]} />
                            </div>
                        }
                        <ShowTime date={post.date} />
                        <LikeBtn id={id} />
                    </div>
                    <div className="post_comment">
                        <h2>Comments: </h2>
                        <CommentList id={id} />
                    </div>
                    {post.user._id === JSON.parse(localStorage.user)._id &&
                        <DeletePost id={id} />
                    }
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default Post;