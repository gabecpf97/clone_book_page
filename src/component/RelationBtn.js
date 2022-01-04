import React, { useEffect, useState } from "react";
import Errors from "./Errors";

const RelationBtn = ({ id, type, refresh }) => {
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
                setDisplay(undefined);
                setErros(undefined);
                break;

            default:
                setErros({err: 'error in loading please try again'});
                break;
        }
    }, [type]);

    const handleRelation = async () => {
        const response = await fetch(`http://localhost:5000/user/${id}/${relation}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const data = await response.json();
        if (data.err) {
            setErros(data);
        } else {
            refresh();
        }
    }

    return (
        <div className="realtion_control">
            {display && 
                <button onClick={() => handleRelation()}>{display}</button>
            }
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default RelationBtn;