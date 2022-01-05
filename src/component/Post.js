import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Errors from "./Errors";
import PostList from "./PostList";
import { Link } from "react-router-dom";
import LikeBtn from "./LikeBtn";

const Post = () => {
    const id = useParams().id;
    const [post, setPost] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await fetch(`http://localhost:5000/post/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    setErrors(data);
                } else {
                    setPost(data.post);
                }
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
            }
        }
        fetchPost();
    }, [id]);

    return(
        <div className="post_deatil container">
            {post &&
                <div>
                    <h1>{post.message}</h1>
                    <Link to={`/user/${post.user._id}`}>{post.user.username}</Link>
                    <p>{post.date}</p>
                    {post.media[0] && 
                        <img crossOrigin="anonymos" 
                        src={`http://localhost:5000/media/?name=${post.media}`} alt="post_img" />
                    }
                    <LikeBtn id={id} />
                    <h2>Comments: </h2>
                    <PostList posts={post.comments} comment={true} />
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default Post;