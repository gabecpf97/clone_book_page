import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import Errors from "./Errors";
import PostList from "./PostList";

const UserTab = ({ id }) => {
    const [display, setDisplay] = useState('post');
    const [errors, setErrors] = useState();
    const [list, setList] = useState();
    const [loaded, setLoaded] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${id}/${display}`, {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if(data.err) {
                    setErrors(data);
                } else {
                    setList(data.results);
                    setLoaded(true);
                }
                setChanged(false);
            } catch (err) {
                    setErrors('Fetching errors');
            }
        }   
        if (changed || !list)
            fetchData();
    }, [id, changed, list, display]);

    const changeDisplay = (changeTo) => {
        setLoaded(false);
        setDisplay(changeTo);
        setChanged(true);
    }

    return (
        <div className="user_tab">
            <div className="tab_control">
                <button onClick={() => changeDisplay('post')}>Post</button>
                <button onClick={() => changeDisplay('comment')}>Comment</button>
                <button onClick={() => changeDisplay('liked_post')}>Liked post</button>
                <button onClick={() => changeDisplay('liked_comment')}>Liked comment</button>
            </div>
            {loaded &&
                <div className="tab_content">
                    <h2>{display.replace('_', ' ')}s</h2>
                    {(display === 'post' || display === 'liked_post') &&
                        <PostList posts={list} errors={errors} />
                    }
                    {(display === 'comment' || display === 'liked_comment') &&
                        <CommentList userComment={list} />
                    }
                </div>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default UserTab;