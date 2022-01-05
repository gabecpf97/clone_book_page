import React, { useState } from "react";
import Errors from "./Errors";
import FormField from "./FormField";

const CreateComment = ({ id, refresh }) => {
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
        post_data.append('comment', message);
        if (media)
            post_data.append('image', media);
        try {
            const response = await fetch(`http://localhost:5000/post/${id}/comment`, {
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
                refresh();
            }
        } catch (err) {
            setErrors({err: 'Fetching error please refresh'});
        }
    }

    return (
        <div className="create_comment">
            <h3>Add Comment</h3>
            <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
                <FormField field_name="message" field_req={true} 
                    field_type="textarea" handleChange={onMessageChange} />
                <FormField field_name="media" field_req={false} 
                    field_type="file" handleChange={onMediaChange} />
                <input type="submit" value="post" className="submit" />
            </form>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default CreateComment;