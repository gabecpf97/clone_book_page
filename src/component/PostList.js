import React from "react";
import Errors from "./Errors";
import { Link } from "react-router-dom";
import Image from "./Image";
import "../style/postList.css";
import LikeBtn from "./LikeBtn";
import ShowTime from "./ShowTime";

const PostList = ({ posts, errors, comment }) => {

    return(
        <div className="list_div container">
            <ul className="post_list">
                {posts&& posts.map(post => {
                    return (
                        <li className="post" key={post._id}>
                            <Link className="user_display" to={`/clone_book_page/user/${post.user._id}`}>
                                <Image url={post.user.icon} icon="small" />
                                <p>{post.user.username}</p>
                            </Link>
                            <Link to={`/clone_book_page/post/${post._id}`}>
                                <p className="post_preview_msg">{post.message}</p>
                                {post.media && post.media.length > 0 && 
                                    <div className="frame">
                                        <Image url={post.media} />
                                    </div>
                                }
                            </Link>
                            <ShowTime date={post.date} />
                            <LikeBtn id={post._id} />
                        </li>
                    )
                })}
                {posts.length < 1 && 
                    <h2>No post yet</h2>
                }
            </ul>
            {errors &&  <Errors errors={errors} />}
        </div>
    )
}

export default PostList;