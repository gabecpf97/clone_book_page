import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Errors from "./Errors";
import UserInfo from "./UserInfo";

const User = () => {
    const id = useParams().id;
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();
    const [comments, setComment] = useState();
    const [errors, setErrors] = useState();
    const [loaded, setLoaded] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isPending, setIsPending] = useState(false);

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
                        setErrors(post);
                    } else {
                        setIsPrivate(false);
                        setPosts(post.results);
                        setComment(comment.results);
                        setUser(check_res.user);
                        setLoaded(true);
                    }
                }
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
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
            setErrors({err: 'Error in fetching data, server problem'});
        }
    }

    return (
        <div className="user">
            {loaded && 
                <div>
                    {!isPrivate &&
                        <UserInfo id={id} 
                            user={user} 
                            posts={posts} 
                            errors={errors} 
                            comments={comments} 
                        />
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