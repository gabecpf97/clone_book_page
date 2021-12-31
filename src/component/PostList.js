import React, { useEffect, useState } from "react";
import Errors from "./Errors";

const PostList = () => {
    const [posts, setPosts] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('http://localhost:5000/all_post', {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    setErrors(data.err);
                } else {
                    setPosts(data.all_posts);
                }
            } catch (err) {
                setErrors('Error in fetching data');
            }
        }
        fetchPost();
    }, []);

    return(
        <div>
            <ul className="post_list">
                {posts&& posts.map(post => {
                    const image_url = `http://localhost:5000/media/?name=${post.media}`;
                    return (
                        <li className="post" key={post._id}>
                            <p>{post.user.username}</p>
                            <h2>{post.message}</h2>
                            {post.media.length > 0 && 
                                <img crossOrigin="anonymous" src={image_url} alt="post_image"/>
                            }
                        </li>
                    )
                })}
            </ul>
            {errors &&  <Errors errors={errors} />}
        </div>
    )
}

export default PostList;