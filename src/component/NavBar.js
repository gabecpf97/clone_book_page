import React from "react";
import { Link } from "react-router-dom";
import "../style/navBar.css";

const NavBar = ({ status }) => {

    return (
        <div className="nav_bar">
            <Link className="logo" to={status ? '/' : '/log_in'}>CloneBook</Link>
            <ul className="pages">
                {!status && 
                    <div className="visitor pages">
                        <Link className="page" to="/sign_up">
                            <li>Sign up</li>
                        </Link>
                        <Link className="page" to="/log_in">
                            <li>Log in</li>
                        </Link>
                    </div>
                }
                {status && 
                    <div className="loged_in pages">
                        <Link className="page" to="/post/create">
                            <li>Create Post</li>
                        </Link>
                        <Link className="page" to={`/user/${JSON.parse(localStorage.user)._id}`}>
                            <li>{JSON.parse(localStorage.user).username}</li>
                        </Link>
                        <Link className="page" to="/log_out">
                            <li>Log out</li>
                        </Link>
                    </div>
                }
            </ul>
        </div>
    )
}

export default NavBar;