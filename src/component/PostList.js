import React from "react";
import Errors from "./Errors";
import { Link } from "react-router-dom";

const PostList = ({ posts, errors, comment }) => {

    return(
        <div>
            <ul className="post_list">
                {posts&& posts.map(post => {
                    const image_url = `http://localhost:5000/media/?name=${post.media}`;
                    return (
                        <li className="post" key={post._id}>
                            <Link to={`/user/${post.user._id}`}>{post.user.username}</Link>
                            {comment && 
                                <div>
                                    <Link to={`/post/${post.belong}`}>
                                        <h2>{post.message}</h2>
                                        {post.media &&post.media.length > 0 && 
                                            <img crossOrigin="anonymous" src={image_url} alt="post_image"/>
                                        }
                                    </Link>
                                </div>
                            }
                            {!comment &&
                                <Link to={`/post/${post._id}`}>
                                    <h2>{post.message}</h2>
                                    {post.media &&post.media.length > 0 && 
                                        <img crossOrigin="anonymous" src={image_url} alt="post_image"/>
                                    }
                                </Link>
                            }
                            <p>likes: {post.likes.length}</p>
                        </li>
                    )
                })}
            </ul>
            {errors &&  <Errors errors={errors} />}
        </div>
    )
}

export default PostList;