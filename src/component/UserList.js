import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Errors from "./Errors";
import Image from "./Image";

const UserList = ({ type }) => {
    const id = useParams().id;
    const [list, setList] = useState();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetechList = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${id}/list/?type=${type}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.err) {
                    setErrors(data);
                } else {
                    setList(data.user_list);
                }
                if (type === 'pending_following' || type === 'pending_follower') {
                    console.log('pending')
                }
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
            }
        }
        fetechList();
    }, [type, id]);

    return (
        <div className="user_list">
            <h1>{type} :</h1>
            {list && list.map(user => {
                return (
                    <li className="user_item" key={user._id}>
                        <Link to={`/user/${user._id}`}>
                            <Image url={user.icon} icon="small" />
                            <p>{user.username}</p>
                        </Link>
                    </li>
                )
            })}
            {list && list.length < 1 &&
                <h2>No {type.replace('_', ' ')}</h2>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default UserList;