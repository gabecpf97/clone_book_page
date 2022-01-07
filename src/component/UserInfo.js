import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import RelationBtn from "./RelationBtn";
import UserTab from "./UserTab";

const UserInfo = ({ id, user, relation, reload }) => {
    
    return (
        <div className="user_info">
            {JSON.parse(localStorage.user)._id === id &&
                <h1>Welcome {user.first_name} {user.last_name}</h1>
            }
            {JSON.parse(localStorage.user)._id !== id &&
                <h1>{user.username}</h1>
            }
            <div className="icon_des">
                <Image url={user.icon} icon="big" />
                {user.description && 
                    <div className="des">
                        <p>{user.description}</p>
                    </div>
                }
            </div>
            <RelationBtn id={id} type={relation} refresh={reload} />
            <div className="follow_div">
                {(relation === 'private' || relation === 'pending confirmation') &&
                    <div className="follow">
                        <p>following: {user.following.length}</p>
                        <p>follower: {user.follower.length}</p>
                    </div>
                }
                {(relation !== 'private' && relation !== 'pending confirmation') &&
                    <div className="follow">
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
            </div>
            {id === JSON.parse(localStorage.user)._id &&
                <div className="account_control">
                    <Link className="page" to="/user/edit">Edit profile</Link>
                    <Link className="page" to="/user/change_password">Change password</Link>
                    <Link className="page" to="/delete_user">Delete Account</Link>
                </div>
            }
            {(relation !== 'private' && relation !== 'pending confirmation') &&
                <UserTab id={id} />
            }
        </div>
    )
}

export default UserInfo;