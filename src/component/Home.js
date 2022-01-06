import React, { useEffect, useState } from "react";
import PostList from "./PostList";

const Home = () => {
    const [posts, setPosts] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('http://localhost:5000/all_post', {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    setErrors(data);
                } else {
                    setPosts(data.all_posts);
                }
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
            }
        }
        document.querySelector('head title').textContent = "Home";
        fetchPost();
    }, []);


    return(
        <div className="home container">
            {posts && <PostList posts={posts} errors={errors} />}
        </div>
    )
}

export default Home;