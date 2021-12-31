import React, { useEffect, useState } from "react";
import PostList from "./PostList";

const Account = () => {
    const [user] = useState(JSON.parse(localStorage.user));
    const [posts, setPosts] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await fetch(`http://localhost:5000/user/${user._id}/post`,{
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    setErrors(data.err);
                } else {
                    setPosts(data.results);
                }
            } catch (err) {
                setErrors(err);
            }
        };  
        fetchPost();
    }, [user]);

    return (
        <div className="account">
            <h1>Welcome {user.first_name} {user.last_name}</h1>
            <p>your post:</p>
            <PostList posts={posts} errors={errors} />
        </div>
    )
}

export default Account;