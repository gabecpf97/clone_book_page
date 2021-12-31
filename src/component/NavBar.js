import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ status }) => {

    return (
        <div className="nav_bar">
            <Link className="logo" to="/">CloneBook</Link>
            <ul className="pages">
                {!status && 
                    <div className="loged_in">
                        <Link className="page" to="/sign_up">
                            <li>Sign up</li>
                        </Link>
                        <Link className="page" to="/log_in">
                            <li>Log in</li>
                        </Link>
                    </div>
                }
                {status && 
                    <div className="visiter">
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