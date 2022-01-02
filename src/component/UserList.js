import React, { useEffect, useState } from "react";

const UserList = ({ type }) => {
    const [error, setError] = useState();

    useEffect(() => {
        const fetechList = async () => {
            try {

            } catch (err) {
                setError('Fetching error please refresh');
            }
        }
        fetechList();
    }, type);

    return (
        <div className="user_list">

        </div>
    )
}

export default UserList;