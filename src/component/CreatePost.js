import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

const CreatePost = () => {
    const nav = useNavigate();
    const [message, setMessage] = useState();
    const [media, setMedia] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        document.querySelector('head title').textContent = "Create Post";
    }, []);

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
            const response = await fetch(`https://clone-book-api-29.herokuapp.com/post/create`, {
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
                nav(`/clone_book_page/post/${data.id}`);
            }
        } catch (err) {
            setErrors({err: 'Error fetching data'});
        }
    }

    return (
        <div className="create_post">
            <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
                <FormField field_name="message" field_req={true} field_type="textarea"
                    handleChange={onMessageChange} />
                <FormField field_name="media" field_req={false} field_type="file"
                    handleChange={onMediaChange} />
                <input className="submit" type="submit" value="post" />
            </form>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default CreatePost;