import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Errors from "./Errors";
import UserInfo from "./UserInfo";

const User = () => {
    const id = useParams().id;
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();
    const [comments, setComment] = useState();
    const [relation, setRelation] = useState();
    const [errors, setErrors] = useState();
    const [loaded, setLoaded] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const checkFollow = await fetch(`http://localhost:5000/user/${id}`, {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }    
                });
                const check_res = await checkFollow.json();
                if (check_res.err) {
                    setErrors(check_res);
                } else if (check_res.p_user) {
                    setUser(check_res.p_user);
                    if (check_res.private)
                        setRelation('private');
                    else 
                        setRelation('pending confirmation');
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
                    ]);
                    const post_list = data[0];
                    const comment_list = data[1];
                    if (post_list.err || comment_list.err) {
                        setErrors(data);
                    } else {
                        setUser(check_res.user);
                        setPosts(post_list.results);
                        setComment(comment_list.results);
                        if (check_res.follow)
                            setRelation('follower');
                        else 
                            setRelation('public');
                        setLoaded(true);
                    }
                }
                setRefresh(false);
                if (id === JSON.parse(localStorage.user)._id)
                    setRelation('user');
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
            }
        };  
        if (refresh || (!user || user._id !== id)) {
            setLoaded(false);
            fetchPost();
        }
    }, [id, comments, refresh, user]);

    const refreshIt = () => {
        setRefresh(true);
    }

    return (
        <div className="user container">
            {loaded && 
                <UserInfo id={id} 
                    user={user} 
                    posts={posts} 
                    errors={errors} 
                    comments={comments} 
                    relation={relation}
                    reload={refreshIt}
                />
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default User;