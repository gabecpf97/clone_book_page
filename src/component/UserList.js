import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Errors from "./Errors";
import Image from "./Image";
import RelationBtn from "./RelationBtn";

const UserList = ({ type, serachList }) => {
    const id = useParams().id;
    const [list, setList] = useState();
    const [errors, setErrors] = useState();
    const [refresh, setRefresh] = useState(false);

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
                setRefresh(false);
            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
            }
        }
        if (serachList) {
            setList(serachList);
        } else {
            document.querySelector('head title').textContent = `${type}`;
            if (refresh || !list)
                fetechList();
        }
    }, [type, id, refresh, list, serachList]);

    const refreshIt = () => {
        setRefresh(true);
    }

    return (
        <div className="user_list">
            <h1>{type} :</h1>
            {list && list.map(user => {
                return (
                    <li className="user_item" key={user._id}>
                        <Link to={`/user/${user._id}`}>
                            <Image url={user.icon} icon="small" />
                            <p>{user.username}</p>
                            {type === 'pending_follower' &&
                                <RelationBtn id={user._id} type='approve' />
                            }
                        </Link>
                        {type === 'follower' &&
                            <RelationBtn id={user._id} type='remove' />
                        }
                        {type === 'following' &&
                            <RelationBtn id={user._id} type='follower' refresh={refreshIt} />
                        }
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