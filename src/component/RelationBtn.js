import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";

const RelationBtn = ({ id, type, refresh }) => {
    const nav = useNavigate()
    const [relation, setRelation] = useState();
    const [display, setDisplay] = useState();
    const [errors, setErros] = useState();

    useEffect(() => {
        switch (type) {
            case 'public':
            case 'private':
                setRelation('follow');
                setDisplay('follow');
                break;

            case 'pending confirmation':
                setRelation('unfollow');
                setDisplay('remove request');
                break;
            
            case 'follower':
                setRelation('unfollow');
                setDisplay('unfollow');
                break;

            case 'user':
            case 'approve':
            case 'remove':
                setDisplay(undefined);
                setErros(undefined);
                break;

            default:
                setErros({err: 'error in loading please try again'});
                break;
        }
    }, [type]);

    const handleStatus = async (selection) => {
        const response = await fetch(`http://localhost:5000/user/${id}/${selection}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const data = await response.json();
        // console.log(data);
        if (data.err) {
            setErros(data);
        } else {
            if (type === 'approve' || type === 'remove') {
                nav(`/user/${JSON.parse(localStorage.user)._id}`);
            } else {
                refresh();
            }
        }
    }

    return (
        <div className="relation_control">
            {display && 
                <button className="page" onClick={() => handleStatus(relation)}>{display}</button>
            }
            {type === 'approve' &&
                <div className="approvement">
                    <button onClick={() => handleStatus('approve')}>{type}</button>
                    <button onClick={() => handleStatus('unapprove')}>dis{type}</button>
                </div>
            }
            {type === 'remove' &&
                <button onClick={() => handleStatus('remove_follower')}>remove</button>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default RelationBtn;