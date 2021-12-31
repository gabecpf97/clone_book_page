import React from "react";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const NavBar = () => {

    return (
        <div className="nav_bar">
            <Link className="logo" to="/">CloneBook</Link>
            <ul className="pages">
                {!localStorage.user && 
                    <div className="loged_in">
                        <Link className="page" to="/sign_up">
                            <li>Sign up</li>
                        </Link>
                        <Link className="page" to="/log_in">
                            <li>Log in</li>
                        </Link>
                    </div>
                }
                {localStorage.user && 
                    <div className="visiter">
                        <LogOut />

                    </div>
                }
            </ul>
        </div>
    )
}

export default NavBar;