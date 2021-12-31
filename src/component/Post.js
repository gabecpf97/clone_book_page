import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Errors from "./Errors";
import PostList from "./PostList";
import { Link } from "react-router-dom";

const Post = () => {
    const id = useParams().id;
    const [post, setPost] = useState();
    const [error, setError] = useState();

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
                    setError(data.err);
                } else {
                    setPost(data.post);
                }
            } catch (err) {
                setError('Error in fetching data');
            }
        }
        fetchPost();
    }, [id]);

    return(
        <div className="post_deatil">
            {post &&
                <div>
                    <h1>{post.message}</h1>
                    <Link to={`/user/${post.user._id}`}>{post.user.username}</Link>
                    <p>{post.date}</p>
                    {post.media[0] && 
                        <img crossOrigin="anonymos" 
                        src={`http://localhost:5000/media/?name=${post.media}`} alt="post_img" />
                    }
                    <p>likes: {post.likes.length}</p>
                    <h2>Comments: </h2>
                    <PostList posts={post.comments} comment={true} />
                </div>
            }
            {error && <Errors errors={error} />}
        </div>
    )
}

export default Post;