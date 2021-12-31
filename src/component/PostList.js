import React from "react";
import Errors from "./Errors";

const PostList = ({ posts, errors }) => {

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