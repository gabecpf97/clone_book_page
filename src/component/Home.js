import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "./PostList";

const Home = () => {
    const nav = useNavigate();
    const [posts, setPosts] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('https://clone-book-api-29.herokuapp.com/all_post', {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (isMounted) {
                    if (data.err) {
                        setErrors(data);
                    } else {
                        setPosts(data.all_posts);
                    }
                }
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
            }
        }
        document.querySelector('head title').textContent = "Home";
        let isMounted = true;
        if (localStorage.user) {
            fetchPost();
        } else {
            nav('/clone_book_page/log_in');
        }

        return () => {isMounted = false}
    }, [nav]);


    return(
        <div className="home container">
            {posts && <PostList posts={posts} errors={errors} />}
        </div>
    )
}

export default Home;