import React from "react";
import Errors from "./Errors";
import { Link } from "react-router-dom";
import Image from "./Image";
import "../style/postList.css";

const PostList = ({ posts, errors, comment }) => {

    return(
        <div className="list_div container">
            <ul className="post_list">
                {posts&& posts.map(post => {
                    return (
                        <li className="post" key={post._id}>
                            <Link className="user_display" to={`/user/${post.user._id}`}>
                                <Image url={post.user.icon} icon="small" />
                                <p>{post.user.username}</p>
                            </Link>
                            {comment && 
                                <Link to={`/post/${post.belong}`}>
                                    {post.media &&post.media.length > 0 && 
                                        <Image url={post.media} />
                                    }   
                                    <h2>{post.message}</h2>
                                </Link>
                            }
                            {!comment &&
                                <Link to={`/post/${post._id}`}>
                                    {post.media && post.media.length > 0 && 
                                        <Image url={post.media} />
                                    }
                                    <h2>{post.message}</h2>
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