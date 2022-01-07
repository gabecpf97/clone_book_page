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
            const response = await fetch(`https://clone-book-api-29.herokuapp.com/${id}/comment`, {
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
            <form className="comment_form" onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
                <FormField  field_req={true} 
                    field_type="textarea" handleChange={onMessageChange} />
                <FormField field_req={false} 
                    field_type="file" handleChange={onMediaChange} />
                    <div>
                        <input type="submit" value="post" className="submit" />
                    </div>
            </form>
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default CreateComment;