import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";

const CreatePost = () => {
    const nav = useNavigate();
    const [message, setMessage] = useState();
    const [media, setMedia] = useState();
    const [errors, setErrors] = useState();

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const onMediaChange = (e) => {
        setMedia(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post_data = new FormData();
        post_data.append('message', message);
        if (media)
            post_data.append('image', media);
        try {
            const response = await fetch(`http://localhost:5000/post/create`, {
                method: "POST",
                body: post_data,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const data = await response.json();
            if (data.err) {
                setErrors(data);
            } else {
                nav(`/post/${data.id}`);
            }
        } catch (err) {
            setErrors({err: 'Error fetching data'});
        }
    }

    return (
        <div className="create_post">
            <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
                <div className="getMessage">
                    <label htmlFor="message">Post message: </label>
                    <textarea name="message" onChange={(e) => onMessageChange(e)}
                        value={message} required={true} />
                </div>
                <div className="getMedia">
                    <label htmlFor="media">Post image: </label>
                    <input type="file" name="media" onChange={(e) => onMediaChange(e)} />
                </div>
                <input className="submit" type="submit" value="post" />
            </form>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default CreatePost;