import React, { useEffect, useState } from "react";
import PostList from "./PostList";

const Account = () => {
    const [user] = useState(JSON.parse(localStorage.user));
    const [posts, setPosts] = useState();
    const [comments, setComment] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const data = await Promise.all([
                    fetch(`http://localhost:5000/user/${user._id}/post`,{
                        headers : {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    }).then(response => response.json()),
                    fetch(`http://localhost:5000/user/${user._id}/comment`, {
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
                    setPosts(post.results);
                    setComment(comment.results);
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
            <h2>Posts: </h2>
            <PostList posts={posts} errors={errors} />
            <h2>Comments: </h2>
            <PostList posts={comments} errors={errors} />
        </div>
    )
}

export default Account;