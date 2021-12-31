import React from "react";
import Errors from "./Errors";
import { Link } from "react-router-dom";

const PostList = ({ posts, errors }) => {

    return(
        <div>
            <ul className="post_list">
                {posts&& posts.map(post => {
                    const image_url = `http://localhost:5000/media/?name=${post.media}`;
                    return (
                        <li className="post" key={post._id}>
                            <p>{post.user.username}</p>
                            <Link to={`/post/${post._id}`}>
                                <h2>{post.message}</h2>
                                {post.media &&post.media.length > 0 && 
                                    <img crossOrigin="anonymous" src={image_url} alt="post_image"/>
                                }
                            </Link>
                        </li>
                    )
                })}
            </ul>
            {errors &&  <Errors errors={errors} />}
        </div>
    )
}

export default PostList;