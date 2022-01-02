import React, { useEffect, useState } from "react";

const UserList = ({ type }) => {
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetechList = async () => {
            try {

            } catch (err) {
                setErrors({err: 'Error in fetching data, server problem'});
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