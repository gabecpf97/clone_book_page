import React from "react";
import PostList from "./PostList";

const UserInfo = ({ id, user, posts, errors, comments }) => {

    return (
        <div className="user_info">
            {/* <img crossOrigin="anonymous" src={`http://localhost:5000/media/?name=${user.icon}`} alt="icon" /> */}
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
            <h2>Comments: </h2>
            <PostList posts={comments} errors={errors} comment={true}/>
        </div>
    )
}

export default UserInfo;