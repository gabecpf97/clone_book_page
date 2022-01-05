import React, { useEffect, useState } from "react";
import Errors from "./Errors";
import PostList from "./PostList";

const UserTab = ({ id }) => {
    const [display, setDisplay] = useState('posts');
    const [errors, setErrors] = useState();
    const [list, setList] = useState();
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();
    const [likedPosts, setLikedPosts] = useState();
    const [likedComments, setLikedComments] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                    fetch(`http://localhost:5000/user/${id}/liked_post`, {
                        headers : {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    }).then(response => response.json()),
                    fetch(`http://localhost:5000/user/${id}/liked_comment`, {
                        headers : {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    }).then(response => response.json()),
                ]);
                const post_list = data[0];
                const comment_list = data[1];
                const liked_p_list = data[2];
                const liked_c_list = data[3];
                if (post_list.err || comment_list.err ||
                        liked_p_list.err || liked_c_list.err) {
                    setErrors(data);
                } else {
                    setPosts(post_list.results);
                    setComments(comment_list.results);
                    setLikedPosts(liked_p_list.results);
                    setLikedComments(liked_c_list.results);
                    setList(post_list.results);
                    setLoaded(true);
                }
        } catch (err) {
                setErrors('Fetching errors');
            }
        }   
        fetchData();
    }, [id]);

    const changeDisplay = (changeTo) => {
        setDisplay(changeTo);
        switch(changeTo) {
            case 'comments':
                setList(comments);
                break;
            
            case 'liked_posts':
                setList(likedPosts);
                break;

            case 'liked_comments':
                setList(likedComments);
                break;

            case 'posts':
            default:
                setList(posts);
                break;
        }
    }

    return (
        <div className="user_tab">
            <button onClick={() => changeDisplay('posts')}>Post</button>
            <button onClick={() => changeDisplay('comments')}>Comment</button>
            <button onClick={() => changeDisplay('liked_posts')}>Liked post</button>
            <button onClick={() => changeDisplay('liked_comments')}>Liked comment</button>
            {loaded &&
                <div className="tab_content">
                    <h2>{display.replace('_', ' ')}</h2>
                    {(display === 'posts' || display === 'liked_posts') &&
                        <PostList posts={list} errors={errors} />
                    }
                    {(display === 'comments' || display === 'liked_comments') &&
                        <PostList posts={list} errors={errors} comment={true} />
                    }
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default UserTab;