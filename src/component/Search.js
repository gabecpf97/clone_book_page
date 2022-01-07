import React, { useEffect, useState } from "react";
import Errors from "./Errors";
import UserList from "./UserList";
import "../style/search.css";

const Search = () => {
    const [input, setInput] = useState();
    const [errors, setErrors] = useState();
    const [list, setList] = useState();

    useEffect(() => {
        document.querySelector('head title').textContent = 'Search';
    }, []);

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(input);
        const response = await fetch(`https://clone-book-api-29.herokuapp.com/user/search/?name=${input}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        console.log(data);
        if (data.err) {
        setErrors(data);
        } else {
            setList(data.users);
        }
    }

    return (
        <div className="search">
            <form className="search_bar" onSubmit={(e) => handleSearch(e)}>
                <input type="text" required={true} onChange={(e) => onInputChange(e)} />
                <input type="submit" value="search" />
            </form>
            {list && <UserList type="Results" serachList={list} />}
            {errors && <Errors errors={errors} />}
        </div>
    )
}

export default Search;