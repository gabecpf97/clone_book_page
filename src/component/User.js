import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Errors from "./Errors";
import FollowBtn from "./FollowBtn";
import PostList from "./PostList";

const User = () => {
    const id = useParams().id;
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();
    const [comments, setComment] = useState();
    const [errors, setErrors] = useState();
    const [loaded, setLoaded] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [hasPending, setHasPending] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const checkFollow = await fetch(`http://localhost:5000/user/${id}`, {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }    
                });
                const check_res = await checkFollow.json();
                if (check_res.private) {
                    setIsPrivate(true);
                    setUser(check_res.username);
                    if (check_res.pending) {
                        setIsPending(true);
                    }
                    setLoaded(true);
                } else {
                    const data = await Promise.all([
                        fetch(`http://localhost:5000/user/${id}/post`,{
                            headers : {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            }
                        }).then(response => response.json()),
                        fetch(`http://localhost:5000/user/${id}/comment`, {
                            headers : {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            }
                        }).then(response => response.json()),
                    ],)
                    const post = data[0];
                    const comment = data[1];
                    if (post.err || comment.err) {
                        setErrors(post.err || comment.err);
                    } else {
                        console.log(check_res.user);
                        setIsPrivate(false);
                        setPosts(post.results);
                        setComment(comment.results);
                        setUser(check_res.user);
                        setLoaded(true);
                    }
                }
            } catch (err) {
                setErrors('server error');
            }
        };  
        setLoaded(false);
        fetchPost();
    }, [id]);

    const onFollow = async (type) => {
        const response = await fetch(`http://localhost:5000/user/${id}/${type}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const data = await response.json();
        if (data.success) {
            console.log(data.success);
        } else if (data.pending !== null) {
            setIsPending(data.pending);
        } else {
            setErrors(data.message);
        }
    }

    return (
        <div className="user">
            {loaded && 
                <div>
                    {!isPrivate &&
                        <div className="access">
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
                    }
                    {isPrivate && 
                        <div className="no_access">
                            <h1>{user} is private</h1>
                            {!isPending &&
                                <button onClick={() => onFollow('follow')}>follow</button>
                            }
                            {isPending &&
                                <button onClick={() => onFollow('unfollow')}>remove request</button>
                            }
                        </div>
                    }
                    {errors && <Errors errors={errors} />}
                </div>
            }
        </div>
    )
}

export default User;