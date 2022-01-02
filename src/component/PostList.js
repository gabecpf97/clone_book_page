import React from "react";
import Errors from "./Errors";
import { Link } from "react-router-dom";
import Image from "./Image";

const PostList = ({ posts, errors, comment }) => {

    return(
        <div>
            <ul className="post_list">
                {posts&& posts.map(post => {
                    return (
                        <li className="post" key={post._id}>
                            <Link to={`/user/${post.user._id}`}>
                                <p>{post.user.username}</p>
                                <Image url={post.user.icon} icon="small" />
                            </Link>
                            {comment && 
                                <div>
                                    <Link to={`/post/${post.belong}`}>
                                        <h2>{post.message}</h2>
                                        {post.media &&post.media.length > 0 && 
                                        <Image url={post.media} />
                                    }
                                    </Link>
                                </div>
                            }
                            {!comment &&
                                <Link to={`/post/${post._id}`}>
                                    <h2>{post.message}</h2>
                                    {post.media &&post.media.length > 0 && 
                                        <Image url={post.media} />
                                    }
                                </Link>
                            }
                            <p>likes: {post.likes.length}</p>
                        </li>
                    )
                })}
                {posts.length < 1 && !comment &&
                    <h2>No post yet</h2>
                }
                {posts.length < 1 && comment &&
                    <h2>No comment yet</h2>
                }
            </ul>
            {errors &&  <Errors errors={errors} />}
        </div>
    )
}

export default PostList;