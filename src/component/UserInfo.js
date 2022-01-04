import React from "react";
import Image from "./Image";
import PostList from "./PostList";
import { Link } from "react-router-dom";
import "../style/userInfo.css";
import RelationBtn from "./RelationBtn";

const UserInfo = ({ id, user, posts, errors, comments, relation, reload }) => {
    return (
        <div className="user_info">
            {JSON.parse(localStorage.user)._id === id &&
                <h1>Welcome {user.first_name} {user.last_name}</h1>
            }
            {JSON.parse(localStorage.user)._id !== id &&
                <h1>{user.username}</h1>
            }
            <Image url={user.icon} icon="big" />
            {(relation === 'private' || relation === 'pending confirmation') &&
                <div>
                    <p>following: {user.following.length}</p>
                    <p>follower: {user.follower.length}</p>
                </div>
            }
            {(relation !== 'private' && relation !== 'pending confirmation') &&
                <div>
                    <Link to="following">following: {user.following.length}</Link>
                    <Link to="follower">followers: {user.follower.length}</Link>
                </div>
            }
            {id === JSON.parse(localStorage.user)._id &&
                <div className="pending">
                    <Link to="pending_following">Pending follows: {user.pending_following.length}</Link>
                    <Link to="pending_follower">Pending followers: {user.pending_follower.length}</Link>
                </div>
            }
            <RelationBtn id={id} type={relation} refresh={reload} />
            {(relation !== 'private' && relation !== 'pending confirmation') &&
                <div>
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
            }
        </div>
    )
}

export default UserInfo;