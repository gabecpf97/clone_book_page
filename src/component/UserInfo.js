import React from "react";
import Image from "./Image";
import PostList from "./PostList";
import "../style/userInfo.css";

const UserInfo = ({ id, user, posts, errors, comments }) => {

    return (
        <div className="user_info">
            <Image url={user.icon} icon="big" />
            {JSON.parse(localStorage.user)._id === id &&
                <h1>Welcome {user.first_name} {user.last_name}</h1>
            }
            {JSON.parse(localStorage.user)._id !== id &&
                <h1>{user.username}</h1>
                            }
            <p>following: {user.following.length}</p>
            <p>followers: {user.follower.length}</p>
            <p>Pending follows: {user.pending_following.length}</p>
            <p>Pending followers: {user.pending_follower.length}</p>
            <h2>Posts: </h2>
            <PostList posts={posts} errors={errors} />
            {JSON.parse(localStorage.user)._id === id && posts.length < 1 &&
                <h3>Create new post now</h3>
            }
            <h2>Comments: </h2>
            <PostList posts={comments} errors={errors} comment={true}/>
            {JSON.parse(localStorage.user)._id === id && comments.length < 1 && 
                <h3>Create new comment now</h3>
            }
        </div>
    )
}

export default UserInfo;