import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Errors from "./Errors";
import UserInfo from "./UserInfo";

const User = () => {
    const id = useParams().id;
    const [user, setUser] = useState();
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
                    setUser(check_res.user);
                    if (check_res.follow)
                        setRelation('follower');
                    else 
                        setRelation('public');
                    setLoaded(true);
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
    }, [id, refresh, user]);

    const refreshIt = () => {
        setRefresh(true);
    }

    return (
        <div className="user container">
            {loaded && user._id === id &&
                <UserInfo id={id} 
                    user={user} 
                    relation={relation}
                    reload={refreshIt}
                />
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default User;