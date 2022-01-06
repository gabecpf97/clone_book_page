import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";
import FormField from "./FormField";

const EditProfile = () => {
    const nav = useNavigate();
    const user = JSON.parse(localStorage.user);
    const [first_name, setFirst_name] = useState(user.first_name);
    const [last_name, setLast_name] = useState(user.last_name);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [description, setDescription] = useState(user.description);
    const [isPrivate, setIsPrivate] = useState(user.private);
    const [icon, setIcon] = useState();
    const [errors, setErrors] = useState();

    useEffect(() =>{
        document.querySelector('head title').textContent = "Edit profile";
    }, []);

    const onFNchange = (e) => {
        setFirst_name(e.target.value);
    }

    const onLNchange = (e) => {
        setLast_name(e.target.value);
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPrivateChange = (e) => {
        setIsPrivate(e.target.checked);
    }

    const onIconChange = (e) => {
        setIcon(e.target.files[0]);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', username);
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('email', email);
        data.append('description', description);
        data.append('private', isPrivate);
        data.append('icon', icon);
        const edit_api = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${user._id}/`, {
                    method: "PUT",
                    body: data,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const res_data = await response.json();
                if (res_data.errors || res_data.err) {
                    setErrors(res_data);
                } else {
                    const update = await fetch(`http://localhost:5000/user/${user._id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    });
                    const update_data = await update.json();
                    localStorage.setItem('user', JSON.stringify(update_data.user));
                    nav(`/user/${user._id}`);
                }
            } catch (err) {
                console.log(err);
                setErrors({err: 'Error in fetching data, server problem'});
            }
        }
        edit_api();
    }


    return (
        <div className="edit_profile">
            <form onSubmit={(e) => handleSubmit(e)}>
            <FormField field_name="first_name"
                field_type="text"
                field_req={true}
                value={first_name}
                handleChange={onFNchange} />
            <FormField field_name="last_name"
                field_type="text"
                field_req={true}
                value={last_name}
                handleChange={onLNchange} />
            <FormField field_name="username"
                field_type="text"
                field_req={true}
                value={username}
                handleChange={onUsernameChange} />
            <FormField field_name="email"
                field_type="text"
                field_req={true}
                value={email}
                handleChange={onEmailChange} />
            <FormField field_name="description"
                field_type="textarea"
                value={description}
                handleChange={onDescriptionChange} />
            <div className="field">
                <label htmlFor="private">Private</label>
                <input type="checkbox" checked={isPrivate} onChange={onPrivateChange} />
            </div>
            <FormField field_name="icon"
                field_type="file"
                field_req={false}
                handleChange={onIconChange} />
            <input type="submit" className="submit" value="submit" />
            {errors && <Errors errors={errors}/>}
            </form>
        </div>
    )
}

export default EditProfile;