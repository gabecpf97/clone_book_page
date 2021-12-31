import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <div className="nav_bar">
            <Link className="logo" to="/">CloneBook</Link>
            <ul className="pages">
                <Link className="page" to="/sign_up">
                    <li>Sign up</li>
                </Link>
                <Link className="page" to="/log_in">
                    <li>Log in</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavBar;